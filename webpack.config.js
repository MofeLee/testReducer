var HtmlwebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// webpack 打包工具
module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules'
      } // 模块化加载css文件
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: "Hello~"
    })
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
};