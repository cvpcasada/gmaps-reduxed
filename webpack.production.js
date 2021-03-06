var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]&sourceMap!sass?indentedSyntax=false&sourceMap=true')},
      { test: /\.css$/, include: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&localIdentName=[path]___[name]__[local]___[hash:base64:5]!cssnext-loader') },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
