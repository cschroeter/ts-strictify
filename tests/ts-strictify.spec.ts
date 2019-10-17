import simpleGit from 'simple-git/promise'
import tmp from 'tmp-promise'
import { TypeScriptOptions } from '../src/lib/typescript'
import { GitOptions } from '../src/lib/git'

import execa from 'execa'
import { join } from 'path'
import { copy, outputFile } from 'fs-extra'

const runTsStrictifyInPath = async (
  path: string,
  options: Partial<TypeScriptOptions & GitOptions> = {},
): Promise<string> => {
  const cwd = process.cwd()
  const tsStrictify = join(cwd, 'dist/cli.js')

  const args = Object.entries(options)
    .map(([key, value]) => [key.replace(/^/, '--'), value])
    .reduce<string[]>((result, [key, value]) => [...result, key.toString(), value.toString()], [])

  process.chdir(path)
  return execa('node', [tsStrictify, ...args])
    .then((response) => response.stdout)
    .catch((error) => error.stdout)
    .finally(() => process.chdir(cwd))
}

test('files are detected correctly', async () => {
  jest.setTimeout(20000)
  const { path } = await tmp.dir()
  const git = simpleGit(path)

  await git
    .init()
    .then(() => git.addConfig('user.name', 'Some One'))
    .then(() => git.addConfig('user.email', 'some@one.com'))
    .then(() => copy(join(__dirname, 'repository'), path))
    .then(() => git.add('./*'))
    .then(() => git.commit('First commit'))
    .then(() => runTsStrictifyInPath(path))
    .then((stdout) => expect(stdout).toMatch(/Found 0 changed file/))

  await git
    .checkoutLocalBranch('feature')
    .then(() => outputFile(join(path, 'foo.ts'), 'const foo = (arg): void => {}'))
    .then(() => runTsStrictifyInPath(path))
    .then((stdout) => {
      expect(stdout).toMatch(/Found 1 changed file/)
      expect(stdout).toMatch(/error TS7006: Parameter 'arg' implicitly has an 'any' type/)
    })
    .then(() => runTsStrictifyInPath(path, { untrackedFiles: false }))
    .then((stdout) => {
      expect(stdout).toMatch(/Found 0 changed file/)
    })

  await git
    .add('./*')
    .then(() => runTsStrictifyInPath(path))
    .then((stdout) => expect(stdout).toMatch(/Found 1 changed file/))
    .then(() => runTsStrictifyInPath(path, { createdFiles: false }))
    .then((stdout) => {
      expect(stdout).toMatch(/Found 0 changed file/)
    })

  await git
    .commit('Second commit')
    .then(() => runTsStrictifyInPath(path))
    .then((stdout) => expect(stdout).toMatch(/Found 1 changed file/))
    .then(() => runTsStrictifyInPath(path, { commitedFiles: false }))
    .then((stdout) => {
      expect(stdout).toMatch(/Found 0 changed file/)
    })
})
