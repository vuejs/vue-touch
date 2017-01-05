import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

export default {
  entry: './src/index.js',
  dest: './dist/vue-touch.js',
  // Module settings
  format: 'umd',
  external: ['hammerjs'],
  globals: {
    hammerjs: 'Hammer'
  },
  moduleName: 'VueTouch',

  plugins: [
    buble(),
    nodeResolve({ jsnext: true, main: true }),
    commonjs(),
    cleanup()
  ]
}
