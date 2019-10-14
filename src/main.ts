import simpleGit from 'simple-git/promise'
import execa from 'execa'

const isSupportedExtension = (fileName: string): boolean => Boolean(fileName.match(/\.tsx?$/))

const findCommitAtWhichTheCurrentBranchForkedFromTargetBranch = async (
  targetBranch: string,
): Promise<string | undefined> => {
  return execa('git', ['merge-base', '--fork-point', targetBranch])
    .then((resposne) => resposne.stdout)
    .catch(() => undefined)
}

const findModifiedAndUntrackedFiles = async (): Promise<string[]> => {
  return simpleGit()
    .status()
    .then(({ created, modified, not_added }) => [...created, ...modified, ...not_added])
    .catch((e) => {
      console.warn('Can not find modified and untracked files', e)
      return []
    })
}

const findStagedFiles = async (): Promise<string[]> => {
  return simpleGit()
    .status()
    .then(({ staged }) => staged)
    .catch((e) => {
      console.warn('Can not find staged files', e)
      return []
    })
}

const findFilesFromDiffToRevision = async (revision?: string): Promise<string[]> => {
  return revision
    ? simpleGit()
        .diffSummary([revision])
        .then(({ files }) => files.reduce((result, { file }) => [...result, file], [] as string[]))
        .catch((e) => {
          console.error('Can not find files that changed compared to master', e)
          return []
        })
    : []
}

const getTypeScriptCompileOutput = async (
  options: Record<TypeScriptOptions, boolean>,
): Promise<string[]> => {
  const args = Object.entries(options)
    .map(([key, value]): [string, boolean] => [key.replace(/^/, '--'), value])
    .reduce<string[]>((result, [key, value]) => [...result, key, value.toString()], [])

  let tscOutput: string[] = []
  try {
    await execa('tsc', args)
  } catch (error) {
    const { all } = error
    tscOutput = (all as string).split('\n')
  }
  return tscOutput
}

export enum TypeScriptOptions {
  noImplicitAny = 'noImplicitAny',
  noImplicitThis = 'noImplicitThis',
  alwaysStrict = 'alwaysStrict',
  strictBindCallApply = 'strictBindCallApply',
  strictNullChecks = 'strictNullChecks',
  strictFunctionTypes = 'strictFunctionTypes',
  strictPropertyInitialization = 'strictPropertyInitialization',
  noEmit = 'noEmit',
}

interface Args {
  typeScriptOptions: Record<TypeScriptOptions, boolean>
  stagedOnly: boolean
  targetBranch: string
  onFoundSinceRevision: (revision: string | undefined) => void
  onFoundChangedFiles: (changedFiles: string[]) => void
  onExamineFile: (file: string) => void
  onCheckFile: (file: string, hasErrors: boolean) => void
}

interface StrictifyResult {
  success: boolean
  errors: number
}

export const strictify = async (args: Args): Promise<StrictifyResult> => {
  const {
    onFoundSinceRevision,
    onFoundChangedFiles,
    onCheckFile,
    typeScriptOptions,
    targetBranch,
    stagedOnly,
  } = args

  const changedFiles = await Promise.all(
    stagedOnly
      ? [findStagedFiles()]
      : [
          findCommitAtWhichTheCurrentBranchForkedFromTargetBranch(targetBranch).then((commit) => {
            onFoundSinceRevision(commit)
            return findFilesFromDiffToRevision(commit)
          }),
          findModifiedAndUntrackedFiles(),
        ],
  ).then(([a, b]) => Array.from(new Set([...a, ...b])).filter(isSupportedExtension))

  onFoundChangedFiles(changedFiles)

  if (changedFiles.length === 0) {
    return { success: true, errors: 0 }
  }

  const tscOut = await getTypeScriptCompileOutput(typeScriptOptions)

  const errorCount = changedFiles.reduce<number>((totalErrorCount, fileName) => {
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
