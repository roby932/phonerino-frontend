var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var ExtractPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  context: __dirname + "/app",
  entry: {
    javascript: path.resolve(__dirname, './app/main.js'),
    html: "./index.html",
    // vendors: ['jquery', 'react', 'react-dom', 'bluebird', 'bootstrap-sass', 'immutable', 'invariant', 'moment', 'ramda', 'react-redux', 'redux-actions', 'redux-thunk', 'xr']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ],
    loaders: [
      { test: /\.scss$/, loader: ExtractPlugin.extract('style', 'css!sass'),},
      { test: /\.less$/, loader: ExtractPlugin.extract('style', 'css!less'),},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
      { test: /\.html$/, loader: "file?name=[name].[ext]" }
    ]

  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.main.js', Infinity),
    new ExtractPlugin('main.css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __UNIVERSAL__: false
    })
  ]
}
