const path = require('path')
const webpack = require('webpack')

const APP_DIR = path.resolve(__dirname, 'src')
const OUT_DIR = path.resolve(__dirname, 'dist')

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
    new webpack.HotModuleReplacementPlugin()
  ]
}
