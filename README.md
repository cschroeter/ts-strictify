# ts-strictify

> Runs [TypeScript](hhttp://www.typescriptlang.org/) in strict mode on your changed files.

![Demo](./docs/assets/preview.png)

## How it works

When you start working on a new feature or fixing a bug, you will modify the code base in one way or another. `ts-strictify` will take a look at these changes - and only these changes (!) and will complain, if the files you have touched are not strict compliant.

That is different than TypeScript works. You could check a single file against the compiler, but the compiler would also look up the imports and the imports of the imports. Not exactly what you want, when you are looking for incrementally update path.

Head over to https://cschroeter.net/moving-to-strict-typescript/ for more insights.

## Install

With `yarn`:

```shellsession
yarn add --dev ts-strictify
```

With `npm`:

```shellsession
npm install --save-dev ts-strictify
```

## Usage

With `yarn`:

```shellsession
yarn ts-strictify
```

You also can disable a compiler flags. E.g. if you want to disable `strictNullChecks`

```shellsession
yarn ts-strictify --strictNullChecks false
```

Below you will find all options.

With [`npx`](https://npm.im/npx):

```shellsession
npx ts-strictify
```

With `npm`:

1. Add `"ts-strictify": "ts-strictify"` to the scripts section of `package.json`.
2. `npm run ts-strictify`

## Pre-Commit Hook

You can run `ts-strictify` as a pre-commit hook using [`husky`](https://github.com/typicode/husky).

```shellstream
yarn add --dev husky
```

In `package.json`, add:

```
"husky": {
  "hooks": {
    "pre-commit": "ts-strictify"
  }
}
```

## Options

```
Options:
  --noImplicitAny                   [boolean] [default: true]
  --noImplicitThis                  [boolean] [default: true]
  --alwaysStrict                    [boolean] [default: true]
  --strictBindCallApply             [boolean] [default: true]
  --strictNullChecks                [boolean] [default: true]
  --strictFunctionTypes             [boolean] [default: true]
  --strictPropertyInitialization    [boolean] [default: true]
  --noEmit                          [boolean] [default: true]
```

## Supported SCM

- Git
