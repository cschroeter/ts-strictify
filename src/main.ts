import simpleGit from 'simple-git/promise'
import execa from 'execa'

const isSupportedExtension = (fileName: string): boolean => Boolean(fileName.match(/\.tsx?$/))

const findWhereCommitForkedFromMaster = async (): Promise<string> => {
  const { stdout } = await execa('git', ['merge-base', '--fork-point', 'master'])
  return stdout
}

const findModifiedAndUntrackedFiles = async (): Promise<string[]> => {
  const { created, modified, not_added } = await simpleGit().status()
  return [...created, ...modified, ...not_added]
}

const findFilesFromDiffToRevision = async (revision: string): Promise<string[]> => {
  return simpleGit()
    .diffSummary([revision])
    .then(({ files }) => files.reduce((result, { file }) => [...result, file], [] as string[]))
    .catch((e) => {
      console.error('Can not find files that changed compared to master', e)
      return []
    })
}

const findChangedFiles = async (revision: string): Promise<string[]> => {
  const [a, b] = await Promise.all([
    findModifiedAndUntrackedFiles(),
    findFilesFromDiffToRevision(revision),
  ])

  return [...new Set([...a, ...b])].filter(isSupportedExtension)
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

interface Args {
  typeScriptOptions: TypeScriptOptions
  onFoundSinceRevision: (revision: string) => void
  onFoundChangedFiles: (changedFiles: string[]) => void
  onExamineFile: (file: string) => void
  onCheckFile: (file: string, hasErrors: boolean) => void
}

interface StrictifyResult {
  success: boolean
  errors: number
}

export const strictify = async (args: Args): Promise<StrictifyResult> => {
  const { onFoundSinceRevision, onFoundChangedFiles, onCheckFile, typeScriptOptions } = args

  const revision = await findWhereCommitForkedFromMaster()
  onFoundSinceRevision(revision)

  const changedFiles = await findChangedFiles(revision)
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
