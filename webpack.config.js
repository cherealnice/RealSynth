const path = require('path')
const webpack = require('webpack')

const APP_DIR = path.resolve(__dirname, 'src')
const OUT_DIR = path.resolve(__dirname, 'dist')
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: OUT_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    compress: true,
  },
  plugins: [
    isDev && new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Store: path.resolve(__dirname, 'src/store'),
    }
  }
}
