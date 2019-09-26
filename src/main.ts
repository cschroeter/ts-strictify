import simpleGit from 'simple-git/promise'
import execa from 'execa'

const findModifiedAndUntrackedFiles = async (): Promise<string[]> => {
  const { created, modified, not_added } = await simpleGit().status()
  return [...created, ...modified, ...not_added]
}

const findWhereCommitForkedFromMaster = async (): Promise<string> => {
  const { stdout } = await execa('git', ['merge-base', '--fork-point', 'master'])
  return stdout
}

const findFilesFromDiffToMaster = async (): Promise<string[]> => {
  return findWhereCommitForkedFromMaster()
    .then((commit) => simpleGit().diffSummary([commit]))
    .then(({ files }) => files.reduce((result, { file }) => [...result, file], [] as string[]))
    .catch((e) => {
      console.error('Can not find files that changed compared to master', e)
      return []
    })
}

const countStrictTypeScriptErrors = async (fileNames: string[]): Promise<number> => {
  try {
    await execa('tsc', ['--strict', 'true'])
    return 0
  } catch (error) {
    const { all } = error
    const tscOutput = (all as string).split('\n')
    return fileNames
      .filter((fileName) => fileName.match(/\.tsx?/))
      .reduce<number>((errorCount, fileName) => {
        tscOutput.map((line) => {
          if (line.includes(fileName)) {
            errorCount++
            console.log(line)
          }
        })
        return errorCount
      }, 0)
  }
}

interface Args {
  onFoundSinceRevision: (revision: string) => void
  onFoundChangedFiles: (changedFiles: string[]) => void
  onExamineFile: (file: string) => void
  onCheckFile: (file: string, hasErrors: boolean) => void
}

export const strictify = async (args: Args): Promise<number> => {
  const [a, b] = await Promise.all([findModifiedAndUntrackedFiles(), findFilesFromDiffToMaster()])
  const fileNames = [...new Set([...a, ...b])]
  return await countStrictTypeScriptErrors(fileNames)
}
