import execa from 'execa'
import simpleGit from 'simple-git/promise'

const isSupportedExtension = (fileName: string): boolean => Boolean(fileName.match(/\.tsx?$/))

const findCommitAtWhichBranchForkedFromTargetBranch = (
  branch: string,
  targetBranch: string,
): Promise<string | undefined> =>
  execa('git', ['merge-base', '--fork-point', targetBranch, branch])
    .then((response) => response.stdout)
    .catch(() => undefined)

const findModifiedAndUntrackedFiles = async (): Promise<string[]> => {
  return simpleGit()
    .status()
    .then(({ created, modified, not_added }) => [...created, ...modified, ...not_added])
    .catch((e) => {
      console.warn('Can not find modified and untracked files', e)
      return []
    })
}

const findFilesFromDiffToRevision = async (
  baseRevision: string | undefined,
  childRevision: string,
): Promise<string[]> => {
  if (baseRevision === undefined) {
    return []
  }
  return simpleGit()
    .diffSummary([baseRevision, childRevision])
    .then(({ files }) => files.reduce((result, { file }) => [...result, file], [] as string[]))
    .catch((e) => {
      console.error('Can not find files that changed compared to master', e)
      return []
    })
}

const listOfAllLocalAnRemoteBranches = (): Promise<string[]> => {
  return simpleGit()
    .branch(['--all'])
    .then((summary) => summary.all)
}

const getTypeScriptCompileOutput = async (options: TypeScriptOptions): Promise<string[]> => {
  const args = Object.entries(options)
    .map(([key, value]) => [key.replace(/^/, '--'), value])
    .reduce<string[]>((result, [key, value]) => [...result, key, value], [])

  let tscOutput: string[] = []
  try {
    await execa('tsc', args)
  } catch (error) {
    const { all } = error
    tscOutput = (all as string).split('\n')
  }
  return tscOutput
}

export interface TypeScriptOptions {
  noImplicitAny: boolean
  noImplicitThis: boolean
  alwaysStrict: boolean
  strictBindCallApply: boolean
  strictNullChecks: boolean
  strictFunctionTypes: boolean
  strictPropertyInitialization: boolean
  noEmit: boolean
}

type OnBranchNotFound = (notFoundBranches: string[]) => void

interface Args {
  typeScriptOptions: TypeScriptOptions
  targetBranch: string
  excludeFilesFixedOnBranch: string[]
  onBranchNotFound: OnBranchNotFound
  onFoundSinceRevision: (revision: string | undefined) => void
  onFoundChangedFiles: (includedFiles: string[], ignoredFiles: string[]) => void
  onExamineFile: (file: string) => void
  onCheckFile: (file: string, hasErrors: boolean) => void
}

interface StrictifyResult {
  success: boolean
  errors: number
}

const verifyBranchesExist = async (
  referencedBranches: string[],
  onBranchNotFound: OnBranchNotFound,
): Promise<void> => {
  const existingBranches = await listOfAllLocalAnRemoteBranches()
  const notFoundBranches = referencedBranches.filter((branch) => !existingBranches.includes(branch))
  if (notFoundBranches.length > 0) {
    onBranchNotFound(notFoundBranches)
  }
}

const filesAlreadyFixedOnOtherBranches = async (
  ignoreFilesChangedOnBranch: string[],
  targetBranch: string,
): Promise<string[]> =>
  (await Promise.all(
    ignoreFilesChangedOnBranch.map((branchWithChangesToIgnore) =>
      findCommitAtWhichBranchForkedFromTargetBranch(branchWithChangesToIgnore, targetBranch).then(
        (baseCommit) => findFilesFromDiffToRevision(baseCommit, branchWithChangesToIgnore),
      ),
    ),
  )).reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue)
  }, [])

export const strictify = async (args: Args): Promise<StrictifyResult> => {
  const {
    onFoundSinceRevision,
    onFoundChangedFiles,
    onCheckFile,
    onBranchNotFound,
    typeScriptOptions,
    targetBranch,
    excludeFilesFixedOnBranch,
  } = args

  const referencedBranches = [targetBranch, ...excludeFilesFixedOnBranch]
  await verifyBranchesExist(referencedBranches, onBranchNotFound)

  const commit = await findCommitAtWhichBranchForkedFromTargetBranch('HEAD', targetBranch)
  onFoundSinceRevision(commit)

  const filesChangedOnHead = await Promise.all([
    findModifiedAndUntrackedFiles(),
    findFilesFromDiffToRevision(commit, 'HEAD'),
  ]).then(([a, b]) => Array.from(new Set([...a, ...b])).filter(isSupportedExtension))

  const filesAlreadyFixedOnOtherBranch = await filesAlreadyFixedOnOtherBranches(
    excludeFilesFixedOnBranch,
    targetBranch,
  )

  const [included, excluded] = filesChangedOnHead.reduce<[string[], string[]]>(
    ([included, excluded], changedFile) => {
      const addHere = filesAlreadyFixedOnOtherBranch.includes(changedFile) ? excluded : included
      addHere.push(changedFile)
      return [included, excluded]
    },
    [[], []],
  )
  onFoundChangedFiles(included, excluded)

  if (included.length === 0) {
    return { success: true, errors: 0 }
  }

  const tscOut = await getTypeScriptCompileOutput(typeScriptOptions)

  const errorCount = included.reduce<number>((totalErrorCount, fileName) => {
    let errorCount = 0
    tscOut.map((line) => {
      if (line.includes(fileName)) {
        errorCount === 0 ? onCheckFile(fileName, true) : null
        totalErrorCount++
        errorCount++
        console.log(line)
      }
    })
    errorCount === 0 ? onCheckFile(fileName, false) : null
    return totalErrorCount
  }, 0)

  return {
    success: errorCount === 0,
    errors: errorCount,
  }
}
