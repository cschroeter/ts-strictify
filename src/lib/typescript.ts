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
  let flagSupported: (flag: string) => boolean = () => true
  try {
    const { all: helpOutput } = await execa('tsc', ['--help'], { all: true, preferLocal: true })
    if (helpOutput !== undefined) {
      flagSupported = (flag: string): boolean => isFlagSupported(flag, helpOutput)
    }
  } catch (error) {
    // hope we are on a recent tsc
  }

  const args = Object.entries(options)
    .map(([key, value]) => [key.replace(/^/, '--'), value])
    .filter(([key, _value]) => flagSupported(key))
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
