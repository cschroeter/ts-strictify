import { isFlagSupported, TypeScriptOptions } from '../src/lib/typescript'
import { helpOutput, TestedTscVersion, TestedVersions } from './help/help-output-mother'

type TscFlag = keyof TypeScriptOptions

const expectToBeSupportedSince = (since: TestedTscVersion, flag: TscFlag): void => {
  const flagWithDashes = '--' + flag
  const firstSupportedIndex = TestedVersions.indexOf(since)
  const unsupported = TestedVersions.slice(0, firstSupportedIndex)
  const supported = TestedVersions.slice(firstSupportedIndex)
  unsupported.forEach((version) => {
    expect(isFlagSupported(flagWithDashes, helpOutput[version])).toBe(false)
  })
  supported.forEach((version) => {
    expect(isFlagSupported(flagWithDashes, helpOutput[version])).toBe(true)
  })
}

test('support for --implicitAny', () => {
  expectToBeSupportedSince('1.0.0', 'noImplicitAny')
})

test('support for --noEmit', () => {
  expectToBeSupportedSince('2.0.0', 'noEmit')
})

test('support for --noImplicitThis', () => {
  expectToBeSupportedSince('2.0.0', 'noImplicitThis')
})

test('support for --strictNullChecks', () => {
  expectToBeSupportedSince('2.0.0', 'strictNullChecks')
})

test('support for --alwaysStrict', () => {
  expectToBeSupportedSince('2.1.4', 'alwaysStrict')
})

test('support for --strictFunctionTypes', () => {
  expectToBeSupportedSince('2.6.1', 'strictFunctionTypes')
})

test('support for --strictBindCallApply', () => {
  expectToBeSupportedSince('3.2.1', 'strictBindCallApply')
})
