import execa from 'execa'
import simpleGit from 'simple-git/promise'
import { isEmpty, split } from 'lodash'

export interface GitOptions {
  targetBranch: string
  commitedFiles: boolean
  stagedFiles: boolean
  createdFiles: boolean
  modifiedFiles: boolean
  untrackedFiles: boolean
}

export const findCommitAtWhichTheCurrentBranchForkedFromTargetBranch = async (
  targetBranch: string,
): Promise<string | undefined> => {
  return execa('git', ['merge-base', '--fork-point', targetBranch])
    .then((resposne) => resposne.stdout)
    .catch(() => undefined)
}

export const findChangedFiles = async (options: GitOptions): Promise<string[]> => {
  const {
    untrackedFiles,
    modifiedFiles,
    createdFiles,
    stagedFiles,
    commitedFiles,
    targetBranch,
  } = options

  const status = await simpleGit().status()
  const commited = await simpleGit()
    .diff([`${targetBranch}...`, '--name-only'])
    .then((diff) => split(diff, '\n').filter((fileName) => !isEmpty(fileName)))

  return Array.from(
    new Set([
      ...(untrackedFiles ? status.not_added : []),
      ...(modifiedFiles ? status.modified : []),
      ...(createdFiles ? status.created : []),
      ...(stagedFiles ? status.staged : []),
      ...(commitedFiles ? commited : []),
    ]),
  )
}
