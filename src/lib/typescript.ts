import execa from 'execa'

export interface TypeScriptOptions {
  noImplicitAny: boolean
  noImplicitThis: boolean
  noImplicitUseStrict: boolean
  alwaysStrict: boolean
  strictBindCallApply: boolean
  strictNullChecks: boolean
  strictFunctionTypes: boolean
  strictPropertyInitialization: boolean
  noEmit: boolean
}

export const isFlagSupported = (flag: string, helpOutput: string): boolean => {
  return helpOutput.includes(flag)
}

export const compile = async (options: TypeScriptOptions): Promise<string[]> => {
  const args = Object.entries(options)
    .map(([key, value]) => [key.replace(/^/, '--'), value])
    .reduce<string[]>((result, [key, value]) => [...result, key, value], [])

  let tscOutput: string[] = []
  try {
    await execa('tsc', args, { all: true, preferLocal: true })
  } catch (error) {
    const { all } = error
    tscOutput = (all as string).split('\n')
  }
  return tscOutput
}
