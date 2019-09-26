#!/usr/bin/env node
import chalk from 'chalk'
import { strictify } from './main'

const result = strictify({
  onFoundSinceRevision: (revision) => {
    console.log(
      `🔍  Finding changed files since ${chalk.bold('git')} revision ${chalk.bold(revision)}.`,
    )
  },
  onFoundChangedFiles: (changedFiles) => {
    console.log(
      `🎯  Found ${chalk.bold(String(changedFiles.length))} changed ${
        changedFiles.length === 1 ? 'file' : 'files'
      }.`,
    )
  },
  onExamineFile: (file) => {
    console.log(`🔍  Examining ${chalk.bold(file)}.`)
  },
  onCheckFile: (file, isFormatted) => {
    if (!isFormatted) {
      console.log(`⛔️  Check failed: ${chalk.bold(file)}`)
    }
  },
})

if (result) {
  process.exit(1)
}
