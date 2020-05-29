export const TestedVersions = [
  '0.8.0',
  '1.0.0',
  '2.0.0',
  '2.1.4', // looks like there never was a 2.1.0
  '2.6.1', // looks like there never was a 2.6.0
  '2.7.1', // looks like there never was a 2.7.0
  '3.0.1', // looks like there never was a 3.0.1
  '3.2.1', // looks like there never was a 3.2.0
] as const
export type TestedTscVersion = typeof TestedVersions[number]

export const helpOutput: Record<TestedTscVersion, string> = {
  '0.8.0': `Syntax:   tsc [options] [file ..]

Examples: tsc hello.ts
          tsc --out foo.js foo.ts
          tsc @args.txt

Options:
  -c, --comments  Emit comments to output
  --declarations  Generates corresponding .d.ts file
  -e, --exec      Execute the script after compilation
  -h, --help      Print this message
  --module KIND   Specify module code generation: "commonjs" (default) or "amd"
  --nolib         Do not include a default lib.d.ts with global declarations
  --out FILE      Concatenate and emit output to single file
  --target VER    Specify ECMAScript target version: "ES3" (default), or "ES5"
  -w, --watch     Watch output files
  @<file>         Insert command line options and files from a file.
✨  Done in 0.99s.`,
  '1.0.0': `Version 1.0.0.0
Syntax:   tsc [options] [file ..]

Examples: tsc hello.ts
          tsc --out foo.js foo.ts
          tsc @args.txt

Options:
  -d, --declaration             Generates corresponding .d.ts file.
  -h, --help                    Print this message.
  --mapRoot LOCATION            Specifies the location where debugger should locate map files instead of generated locations.
  -m KIND, --module KIND        Specify module code generation: 'commonjs' or 'amd'
  --noImplicitAny               Warn on expressions and declarations with an implied 'any' type.
  --out FILE                    Concatenate and emit output to single file.
  --outDir DIRECTORY            Redirect output structure to the directory.
  --removeComments              Do not emit comments to output.
  --sourcemap                   Generates corresponding .map file.
  --sourceRoot LOCATION         Specifies the location where debugger should locate TypeScript files instead of source locations.
  -t VERSION, --target VERSION  Specify ECMAScript target version: 'ES3' (default), or 'ES5'
  -v, --version                 Print the compiler's version: 1.0.0.0
  -w, --watch                   Watch input files.
  @<file>                       Insert command line options and files from a file.
✨  Done in 0.83s.`,
  '2.0.0': `Version 2.0.0
Syntax:   tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --out file.js file.ts
          tsc @args.txt

Options:
 --allowJs                           Allow javascript files to be compiled.
 --allowSyntheticDefaultImports      Allow default imports from modules with no default export. This does not affect code emit, just typechecking.
 --allowUnreachableCode              Do not report errors on unreachable code.
 --allowUnusedLabels                 Do not report errors on unused labels.
 --baseUrl                           Base directory to resolve non-absolute module names.
 -d, --declaration                   Generates corresponding '.d.ts' file.
 --experimentalDecorators            Enables experimental support for ES7 decorators.
 --forceConsistentCasingInFileNames  Disallow inconsistently-cased references to the same file.
 -h, --help                          Print this message.
 --init                              Initializes a TypeScript project and creates a tsconfig.json file.
 --jsx KIND                          Specify JSX code generation: 'preserve' or 'react'
 --lib                               Specify library files to be included in the compilation: 
                                       'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'dom' 'webworker' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 
 --mapRoot LOCATION                  Specify the location where debugger should locate map files instead of generated locations.
 --maxNodeModuleJsDepth              The maximum dependency depth to search under node_modules and load JavaScript files
 -m KIND, --module KIND              Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
 --moduleResolution                  Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6).
 --newLine NEWLINE                   Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).
 --noEmit                            Do not emit outputs.
 --noEmitOnError                     Do not emit outputs if any errors were reported.
 --noFallthroughCasesInSwitch        Report errors for fallthrough cases in switch statement.
 --noImplicitAny                     Raise error on expressions and declarations with an implied 'any' type.
 --noImplicitReturns                 Report error when not all code paths in function return a value.
 --noImplicitThis                    Raise error on 'this' expressions with an implied 'any' type.
 --noImplicitUseStrict               Do not emit 'use strict' directives in module output.
 --noUnusedLocals                    Report Errors on Unused Locals.
 --noUnusedParameters                Report Errors on Unused Parameters.
 --outDir DIRECTORY                  Redirect output structure to the directory.
 --outFile FILE                      Concatenate and emit output to single file.
 --preserveConstEnums                Do not erase const enum declarations in generated code.
 --pretty                            Stylize errors and messages using color and context. (experimental)
 -p DIRECTORY, --project DIRECTORY   Compile the project in the given directory.
 --reactNamespace                    Specify the object invoked for createElement and __spread when targeting 'react' JSX emit
 --removeComments                    Do not emit comments to output.
 --rootDir LOCATION                  Specify the root directory of input files. Use to control the output directory structure with --outDir.
 --skipLibCheck                      Skip type checking of declaration files.
 --sourceMap                         Generates corresponding '.map' file.
 --sourceRoot LOCATION               Specify the location where debugger should locate TypeScript files instead of source locations.
 --strictNullChecks                  Enable strict null checks.
 --suppressImplicitAnyIndexErrors    Suppress noImplicitAny errors for indexing objects lacking index signatures.
 -t VERSION, --target VERSION        Specify ECMAScript target version: 'ES3' (default), 'ES5', or 'ES2015'
 --traceResolution                   Enable tracing of the name resolution process.
 --types                             Type declaration files to be included in compilation.
 -v, --version                       Print the compiler's version.
 -w, --watch                         Watch input files.
 @<file>                             Insert command line options and files from a file.
✨  Done in 0.59s.
yarn run v1.22.4`,
  '2.1.4': `Version 2.1.4
Syntax:   tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt

Options:
 --allowJs                           Allow javascript files to be compiled.
 --allowSyntheticDefaultImports      Allow default imports from modules with no default export. This does not affect code emit, just typechecking.
 --allowUnreachableCode              Do not report errors on unreachable code.
 --allowUnusedLabels                 Do not report errors on unused labels.
 --alwaysStrict                      Parse in strict mode and emit "use strict" for each source file
 --baseUrl                           Base directory to resolve non-absolute module names.
 -d, --declaration                   Generates corresponding '.d.ts' file.
 --experimentalDecorators            Enables experimental support for ES7 decorators.
 --forceConsistentCasingInFileNames  Disallow inconsistently-cased references to the same file.
 -h, --help                          Print this message.
 --importHelpers                     Import emit helpers from 'tslib'.
 --init                              Initializes a TypeScript project and creates a tsconfig.json file.
 --jsx KIND                          Specify JSX code generation: 'preserve' or 'react'
 --jsxFactory                        Specify the JSX factory function to use when targeting 'react' JSX emit, e.g. 'React.createElement' or 'h'.
 --lib                               Specify library files to be included in the compilation: 
                                       'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'dom' 'dom.iterable' 'webworker' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 
 --mapRoot LOCATION                  Specify the location where debugger should locate map files instead of generated locations.
 --maxNodeModuleJsDepth              The maximum dependency depth to search under node_modules and load JavaScript files
 -m KIND, --module KIND              Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
 --moduleResolution STRATEGY         Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6).
 --newLine NEWLINE                   Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).
 --noEmit                            Do not emit outputs.
 --noEmitOnError                     Do not emit outputs if any errors were reported.
 --noFallthroughCasesInSwitch        Report errors for fallthrough cases in switch statement.
 --noImplicitAny                     Raise error on expressions and declarations with an implied 'any' type.
 --noImplicitReturns                 Report error when not all code paths in function return a value.
 --noImplicitThis                    Raise error on 'this' expressions with an implied 'any' type.
 --noImplicitUseStrict               Do not emit 'use strict' directives in module output.
 --noUnusedLocals                    Report errors on unused locals.
 --noUnusedParameters                Report errors on unused parameters.
 --outDir DIRECTORY                  Redirect output structure to the directory.
 --outFile FILE                      Concatenate and emit output to single file.
 --preserveConstEnums                Do not erase const enum declarations in generated code.
 --pretty                            Stylize errors and messages using color and context. (experimental)
 -p DIRECTORY, --project DIRECTORY   Compile the project in the given directory.
 --reactNamespace                    Specify the object invoked for createElement and __spread when targeting 'react' JSX emit
 --removeComments                    Do not emit comments to output.
 --rootDir LOCATION                  Specify the root directory of input files. Use to control the output directory structure with --outDir.
 --skipLibCheck                      Skip type checking of declaration files.
 --sourceMap                         Generates corresponding '.map' file.
 --sourceRoot LOCATION               Specify the location where debugger should locate TypeScript files instead of source locations.
 --strictNullChecks                  Enable strict null checks.
 --suppressImplicitAnyIndexErrors    Suppress noImplicitAny errors for indexing objects lacking index signatures.
 -t VERSION, --target VERSION        Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
 --traceResolution                   Enable tracing of the name resolution process.
 --types                             Type declaration files to be included in compilation.
 -v, --version                       Print the compiler's version.
 -w, --watch                         Watch input files.
 @<file>                             Insert command line options and files from a file.
✨  Done in 0.67s.`,
  '2.6.1': `Version 2.6.1
Syntax:   tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt

Options:
 -h, --help                                         Print this message.
 --all                                              Show all compiler options.
 -v, --version                                      Print the compiler's version.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
 --pretty                                           Stylize errors and messages using color and context (experimental).
 -w, --watch                                        Watch input files.
 -t VERSION, --target VERSION                       Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'.
 -m KIND, --module KIND                             Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'.
 --lib                                              Specify library files to be included in the compilation: 
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'esnext' 'dom' 'dom.iterable' 'webworker' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 'es2017.intl' 'esnext.asynciterable' 
 --allowJs                                          Allow javascript files to be compiled.
 --jsx KIND                                         Specify JSX code generation: 'preserve', 'react-native', or 'react'.
 -d, --declaration                                  Generates corresponding '.d.ts' file.
 --sourceMap                                        Generates corresponding '.map' file.
 --outFile FILE                                     Concatenate and emit output to single file.
 --outDir DIRECTORY                                 Redirect output structure to the directory.
 --removeComments                                   Do not emit comments to output.
 --noEmit                                           Do not emit outputs.
 --strict                                           Enable all strict type-checking options.
 --noImplicitAny                                    Raise error on expressions and declarations with an implied 'any' type.
 --strictNullChecks                                 Enable strict null checks.
 --strictFunctionTypes                              Enable strict checking of function types.
 --noImplicitThis                                   Raise error on 'this' expressions with an implied 'any' type.
 --alwaysStrict                                     Parse in strict mode and emit "use strict" for each source file.
 --noUnusedLocals                                   Report errors on unused locals.
 --noUnusedParameters                               Report errors on unused parameters.
 --noImplicitReturns                                Report error when not all code paths in function return a value.
 --noFallthroughCasesInSwitch                       Report errors for fallthrough cases in switch statement.
 --types                                            Type declaration files to be included in compilation.
 @<file>                                            Insert command line options and files from a file.
✨  Done in 0.76s.`,
  '2.7.1': `Version 2.7.1
Syntax:   tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt

Options:
 -h, --help                                         Print this message.
 --all                                              Show all compiler options.
 -v, --version                                      Print the compiler's version.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
 --pretty                                           Stylize errors and messages using color and context (experimental).
 -w, --watch                                        Watch input files.
 -t VERSION, --target VERSION                       Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'.
 -m KIND, --module KIND                             Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'.
 --lib                                              Specify library files to be included in the compilation.
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'es2018' 'esnext' 'dom' 'dom.iterable' 'webworker' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 'es2017.intl' 'es2017.typedarrays' 'esnext.array' 'esnext.asynciterable' 'esnext.promise' 
 --allowJs                                          Allow javascript files to be compiled.
 --jsx KIND                                         Specify JSX code generation: 'preserve', 'react-native', or 'react'.
 -d, --declaration                                  Generates corresponding '.d.ts' file.
 --sourceMap                                        Generates corresponding '.map' file.
 --outFile FILE                                     Concatenate and emit output to single file.
 --outDir DIRECTORY                                 Redirect output structure to the directory.
 --removeComments                                   Do not emit comments to output.
 --noEmit                                           Do not emit outputs.
 --strict                                           Enable all strict type-checking options.
 --noImplicitAny                                    Raise error on expressions and declarations with an implied 'any' type.
 --strictNullChecks                                 Enable strict null checks.
 --strictFunctionTypes                              Enable strict checking of function types.
 --strictPropertyInitialization                     Enable strict checking of property initialization in classes.
 --noImplicitThis                                   Raise error on 'this' expressions with an implied 'any' type.
 --alwaysStrict                                     Parse in strict mode and emit "use strict" for each source file.
 --noUnusedLocals                                   Report errors on unused locals.
 --noUnusedParameters                               Report errors on unused parameters.
 --noImplicitReturns                                Report error when not all code paths in function return a value.
 --noFallthroughCasesInSwitch                       Report errors for fallthrough cases in switch statement.
 --types                                            Type declaration files to be included in compilation.
 --esModuleInterop                                  Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.
 @<file>                                            Insert command line options and files from a file.
✨  Done in 0.57s.`,
  '3.0.1': `Version 3.0.1
Syntax:   tsc [options] [file...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json

Options:
 -h, --help                                         Print this message.
 --all                                              Show all compiler options.
 -v, --version                                      Print the compiler's version.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
 -b, --build                                        Build one or more projects and their dependencies, if out of date
 --pretty                                           Stylize errors and messages using color and context (experimental).
 -w, --watch                                        Watch input files.
 -t VERSION, --target VERSION                       Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'.
 -m KIND, --module KIND                             Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'.
 --lib                                              Specify library files to be included in the compilation.
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'es2018' 'esnext' 'dom' 'dom.iterable' 'webworker' 'webworker.importscripts' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 'es2017.intl' 'es2017.typedarrays' 'es2018.intl' 'es2018.promise' 'es2018.regexp' 'esnext.array' 'esnext.symbol' 'esnext.asynciterable' 'esnext.intl' 
 --allowJs                                          Allow javascript files to be compiled.
 --jsx KIND                                         Specify JSX code generation: 'preserve', 'react-native', or 'react'.
 -d, --declaration                                  Generates corresponding '.d.ts' file.
 --declarationMap                                   Generates a sourcemap for each corresponding '.d.ts' file.
 --sourceMap                                        Generates corresponding '.map' file.
 --outFile FILE                                     Concatenate and emit output to single file.
 --outDir DIRECTORY                                 Redirect output structure to the directory.
 --removeComments                                   Do not emit comments to output.
 --noEmit                                           Do not emit outputs.
 --strict                                           Enable all strict type-checking options.
 --noImplicitAny                                    Raise error on expressions and declarations with an implied 'any' type.
 --strictNullChecks                                 Enable strict null checks.
 --strictFunctionTypes                              Enable strict checking of function types.
 --strictPropertyInitialization                     Enable strict checking of property initialization in classes.
 --noImplicitThis                                   Raise error on 'this' expressions with an implied 'any' type.
 --alwaysStrict                                     Parse in strict mode and emit "use strict" for each source file.
 --noUnusedLocals                                   Report errors on unused locals.
 --noUnusedParameters                               Report errors on unused parameters.
 --noImplicitReturns                                Report error when not all code paths in function return a value.
 --noFallthroughCasesInSwitch                       Report errors for fallthrough cases in switch statement.
 --types                                            Type declaration files to be included in compilation.
 --esModuleInterop                                  Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.
 @<file>                                            Insert command line options and files from a file.
✨  Done in 0.95s.`,
  '3.2.1': `Version 3.2.1
Syntax:   tsc [options] [file...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json

Options:
 -h, --help                                         Print this message.
 -w, --watch                                        Watch input files.
 --pretty                                           Stylize errors and messages using color and context (experimental).
 --all                                              Show all compiler options.
 -v, --version                                      Print the compiler's version.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.
 -b, --build                                        Build one or more projects and their dependencies, if out of date
 -t VERSION, --target VERSION                       Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'.
 -m KIND, --module KIND                             Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'.
 --lib                                              Specify library files to be included in the compilation.
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'es2018' 'esnext' 'dom' 'dom.iterable' 'webworker' 'webworker.importscripts' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string' 'es2017.intl' 'es2017.typedarrays' 'es2018.intl' 'es2018.promise' 'es2018.regexp' 'esnext.array' 'esnext.symbol' 'esnext.asynciterable' 'esnext.intl' 'esnext.bigint' 
 --allowJs                                          Allow javascript files to be compiled.
 --jsx KIND                                         Specify JSX code generation: 'preserve', 'react-native', or 'react'.
 -d, --declaration                                  Generates corresponding '.d.ts' file.
 --declarationMap                                   Generates a sourcemap for each corresponding '.d.ts' file.
 --sourceMap                                        Generates corresponding '.map' file.
 --outFile FILE                                     Concatenate and emit output to single file.
 --outDir DIRECTORY                                 Redirect output structure to the directory.
 --removeComments                                   Do not emit comments to output.
 --noEmit                                           Do not emit outputs.
 --strict                                           Enable all strict type-checking options.
 --noImplicitAny                                    Raise error on expressions and declarations with an implied 'any' type.
 --strictNullChecks                                 Enable strict null checks.
 --strictFunctionTypes                              Enable strict checking of function types.
 --strictBindCallApply                              Enable strict 'bind', 'call', and 'apply' methods on functions.
 --strictPropertyInitialization                     Enable strict checking of property initialization in classes.
 --noImplicitThis                                   Raise error on 'this' expressions with an implied 'any' type.
 --alwaysStrict                                     Parse in strict mode and emit "use strict" for each source file.
 --noUnusedLocals                                   Report errors on unused locals.
 --noUnusedParameters                               Report errors on unused parameters.
 --noImplicitReturns                                Report error when not all code paths in function return a value.
 --noFallthroughCasesInSwitch                       Report errors for fallthrough cases in switch statement.
 --types                                            Type declaration files to be included in compilation.
 --esModuleInterop                                  Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.
 @<file>                                            Insert command line options and files from a file.
✨  Done in 0.51s.`,
}
