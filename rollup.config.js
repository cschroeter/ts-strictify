import typescript from 'rollup-plugin-typescript2'
import hashbang from 'rollup-plugin-hashbang'
import pkg from './package.json'

export default [
  {
    input: 'src/main.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    external: ['simple-git/promise', 'execa'],
    plugins: [typescript(), hashbang()],
  },
]
