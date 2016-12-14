var path = require('path')
var webpack = require('webpack')

const config = {
  entry: {
      example: './example/example.js',
      vendor: ['vue', 'hammerjs'],
  },
  output: {
    path: path.resolve(__dirname, "../example"),
    publicPath: '/',
    library: 'umd',
    // libraryTarget: 'VueTouch',
    filename: '[name].build.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        include: path.resolve(__dirname, "../src")
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}

module.exports = config
