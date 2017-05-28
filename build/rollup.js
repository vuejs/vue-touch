const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const cleanup = require('rollup-plugin-cleanup');
const { rollup } = require('rollup');
const path = require('path');

const bubbleConfig = {
  transforms: { dangerousForOf: true },
};

// UMD
rollup({
  entry: path.resolve(__dirname, '../src/index.js'),
  sourceMap: true,
  external: ['hammerjs'],

  plugins: [
    buble(bubbleConfig),
    nodeResolve({ jsnext: true, main: true }),
    commonjs(),
    cleanup()
  ]
}).then(bundle => bundle.write({
  format: 'umd',
  exports: 'named',
  moduleName: 'VueTouch',
  globals: {
    hammerjs: 'Hammer'
  },
  dest: path.join(path.resolve(__dirname, '../dist'), 'vue-touch.js')
}))

// ESM
rollup({
  entry: path.resolve(__dirname, '../src/index.js'),
  external: ['hammerjs'],
  plugins: [
    buble(bubbleConfig),
    cleanup()
  ]
}).then(bundle => bundle.write({
  format: 'es',
  dest: path.join(path.resolve(__dirname, '../dist'), 'vue-touch.esm.js'),
}));
