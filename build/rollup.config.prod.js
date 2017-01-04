import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.js',
  format: 'umd',
  external: ['hammer'],
  dest: './dist/vue-touch.js', // equivalent to --output
  plugins: [
    buble(),
    nodeResolve({ jsnext: true, main: true }),
    commonjs(),
  ]
}
