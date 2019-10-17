import execa from 'execa'
import { isEmpty } from 'lodash'

export interface GitOptions {
  targetBranch: string
  commited: boolean
  modified: boolean
  untracked: boolean
  staged: boolean
}

export const findCommitAtWhichTheCurrentBranchForkedFromTargetBranch = async (
  targetBranch: string,
): Promise<string | undefined> => {
  return execa('git', ['merge-base', '--fork-point', targetBranch])
    .then((resposne) => resposne.stdout)
    .catch(() => undefined)
}

const findCommitedFiles = (branch: string): Promise<string[]> => {
  return execa('git', ['diff', `${branch}...`, '--name-only'])
    .then((response) => response.stdout)
    .then((stdout) => (isEmpty(stdout) ? [] : stdout.split('\n')))
    .catch((e) => {
      console.log(e)
      return []
    })
}

const findStagedFiles = (): Promise<string[]> => {
  return execa('git', ['diff', '--staged', '--name-only'])
    .then((resposne) => resposne.stdout)
    .then((stdout) => (isEmpty(stdout) ? [] : stdout.split('\n')))
    .catch((e) => {
      console.log(e)
      return []
    })
}

const findModifiedFiles = (): Promise<string[]> => {
  return execa('git', ['diff', '--name-only'])
    .then((resposne) => resposne.stdout)
    .then((stdout) => (isEmpty(stdout) ? [] : stdout.split('\n')))
    .catch((e) => {
      console.log(e)
      return []
    })
}

const findUntrackedFiles = (): Promise<string[]> => {
  return execa('git', ['ls-files', '--others', '--exclude-standard'])
    .then((resposne) => resposne.stdout)
    .then((stdout) => (isEmpty(stdout) ? [] : stdout.split('\n')))
    .catch((e) => {
      console.log(e)
      return []
    })
}

export const findChangedFiles = (options: GitOptions): Promise<string[]> => {
  const { modified, untracked, staged, commited, targetBranch } = options
  return Promise.all([
    modified ? findModifiedFiles() : [],
    untracked ? findUntrackedFiles() : [],
    staged ? findStagedFiles() : [],
    commited ? findCommitedFiles(targetBranch) : [],
  ]).then(([a, b, c, d]) => Array.from(new Set([...a, ...b, ...c, ...d])))
}
