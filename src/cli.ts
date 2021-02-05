#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import { pick } from 'lodash'
import { strictify } from './ts-strictify'

const run = async (): Promise<void> => {
  const argv = yargs
    .options({
      noImplicitAny: { type: 'boolean', default: true },
      noImplicitThis: { type: 'boolean', default: true },
      noImplicitUseStrict: { type: 'boolean', default: false },
      alwaysStrict: { type: 'boolean', default: true },
      strictBindCallApply: { type: 'boolean', default: true },
      strictNullChecks: { type: 'boolean', default: true },
      strictFunctionTypes: { type: 'boolean', default: true },
      strictPropertyInitialization: { type: 'boolean', default: true },
      noUncheckedIndexedAccess: { type: 'boolean', default: true },
      noEmit: { type: 'boolean', default: true },
      targetBranch: { type: 'string', default: 'master' },
      commitedFiles: { type: 'boolean', default: true },
      stagedFiles: { type: 'boolean', default: true },
      modifiedFiles: { type: 'boolean', default: true },
      untrackedFiles: { type: 'boolean', default: true },
      createdFiles: { type: 'boolean', default: true },
    })
    .parserConfiguration({
      'strip-dashed': true,
    }).argv

  const typeScriptOptions = pick(argv, [
    'noImplicitAny',
    'noImplicitThis',
    'noImplicitUseStrict',
    'alwaysStrict',
    'strictBindCallApply',
    'strictNullChecks',
    'strictFunctionTypes',
    'strictPropertyInitialization',
    'noUncheckedIndexedAccess',
    'noEmit',
  ])

  const gitOptions = pick(argv, [
    'commitedFiles',
    'stagedFiles',
    'modifiedFiles',
    'untrackedFiles',
    'createdFiles',
    'targetBranch',
  ])

  const result = await strictify({
    gitOptions,
    typeScriptOptions,
    onFoundChangedFiles: (changedFiles) => {
      console.log(
        `🎯  Found ${chalk.bold(String(changedFiles.length))} changed ${
          changedFiles.length === 1 ? 'file' : 'files'
        }`,
      )
    },
    onExamineFile: (file) => {
      console.log(`🔍  Checking ${chalk.bold(file)} ...`)
    },
    onCheckFile: (file, hasError) =>
      hasError
        ? console.log(`❌  ${chalk.bold(file)} failed`)
        : console.log(`✅  ${chalk.bold(file)} passed`),
  })

  if (result.errors) {
    console.log(`💥  ${result.errors} errors found`)
    process.exit(1)
  } else {
    console.log(`🎉  ${chalk.green('All files passed')}`)
  }
}
run()
