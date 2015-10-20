var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  devtool: 'eval',
  context: __dirname + "/app",
  entry: {
    javascript: path.resolve(__dirname, './app/app.js'),
    html: "./index.html",
    vendors: ['react', 'react-dom']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "app.js",
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
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
      { test: /\.html$/, loader: "file?name=[name].[ext]" }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.app.js', Infinity),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __UNIVERSAL__: false
    })
  ]
};


