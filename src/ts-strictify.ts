import {
  GitOptions,
  findChangedFiles,
  findCommitAtWhichTheCurrentBranchForkedFromTargetBranch,
} from './lib/git'
import { TypeScriptOptions, compile } from './lib/typescript'

export interface Args {
  typeScriptOptions: TypeScriptOptions
  gitOptions: GitOptions
  onFoundSinceRevision: (revision: string | undefined) => void
  onFoundChangedFiles: (changedFiles: string[]) => void
  onExamineFile: (file: string) => void
  onCheckFile: (file: string, hasErrors: boolean) => void
}

export interface StrictifyResult {
  success: boolean
  errors: number
}

export const strictify = async (args: Args): Promise<StrictifyResult> => {
  const {
    onFoundSinceRevision,
    onFoundChangedFiles,
    onCheckFile,
    typeScriptOptions,
    gitOptions,
  } = args

  const commit = await findCommitAtWhichTheCurrentBranchForkedFromTargetBranch(
    gitOptions.targetBranch,
  )
  onFoundSinceRevision(commit)

  const changedFiles = await findChangedFiles(gitOptions)
  changedFiles.filter((fileName) => Boolean(fileName.match(/\.tsx?$/)))
  onFoundChangedFiles(changedFiles)

  if (changedFiles.length === 0) {
    return { success: true, errors: 0 }
  }

  const tscOut = await compile(typeScriptOptions)

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
