#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import { strictify, TypeScriptOptions } from './main'

const run = async (): Promise<void> => {
  const argv = yargs
    .options({
      noImplicitAny: { type: 'boolean', default: true },
      noImplicitThis: { type: 'boolean', default: true },
      alwaysStrict: { type: 'boolean', default: true },
      strictBindCallApply: { type: 'boolean', default: true },
      strictNullChecks: { type: 'boolean', default: true },
      strictFunctionTypes: { type: 'boolean', default: true },
      strictPropertyInitialization: { type: 'boolean', default: true },
      noEmit: { type: 'boolean', default: true },
    })
    .parserConfiguration({
      'strip-dashed': true,
    }).argv

  const typeScriptOptions = Object.entries(argv)
    .filter(([_, value]) => typeof value === 'boolean')
    .reduce<TypeScriptOptions>(
      (options, [key, value]) => Object.assign({ ...options, [key]: value }),
      {} as TypeScriptOptions,
    )

  const result = await strictify({
    typeScriptOptions,
    onFoundSinceRevision: (revision) => {
      console.log(
        `🔍  Finding changed files since ${chalk.bold('git')} revision ${chalk.bold(revision)}`,
      )
    },
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
    process.exit(1)
  } else {
    console.log(` ${chalk.green('All files passed')}`)
  }
}
run()
