var path = require('path')
var webpack = require('webpack')

const config = {
  entry: {
      example: ['./example/example.js'],
      vendor: ['vue', 'hammerjs'],
  },
  output: {
    path: path.resolve(__dirname, "../example"),
    publicPath: '/',
    library: 'VueTouch',
    libraryTarget: 'umd',
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
        exclude: path.resolve(__dirname, "../node_modules")
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : "'development'"
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  devtool: 'source-map',
  performance: {
    hints: false
  },
  /*devServer: {
    contentBase: '/example/'
  }*/
}

module.exports = config
