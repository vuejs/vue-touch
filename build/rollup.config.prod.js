import buble from 'rollup-plugin-buble'

export default {
  entry: '../src/index.js',
  format: 'umd',
  dest: '../dist/vue-touch.js' // equivalent to --output
  plugins: [buble()]
};
