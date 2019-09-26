#!/usr/bin/env node
import chalk from 'chalk'
import { strictify } from './main'

const run = async (): Promise<void> => {
  const result = await strictify({
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
