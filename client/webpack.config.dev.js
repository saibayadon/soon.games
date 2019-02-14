// Require
const webpack = require('webpack');

const { resolve } = require('path');

const buildPath = resolve(__dirname, 'build');
const mainPath = resolve(__dirname, 'src', 'index.js');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    mainPath,
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    inline: true,
    publicPath: '/',
    port: 8080,
    historyApiFallback: true,
  },
  output: {
    path: buildPath,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'postcss-loader?sourceMap',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
        loader: 'url-loader',
        options: {
          name: 'assets/[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
    new OfflinePlugin({
      appShell: '/',
      externals: [
        '/',
        'https://api.soon.games/?platform=SWITCH&type=NEW',
        'https://api.soon.games/?platform=SWITCH&type=NEW',
        'https://api.soon.games/?platform=PS4&type=NEW',
        'https://api.soon.games/?platform=PC&type=NEW',
        'https://api.soon.games/?platform=3DS&type=NEW',
        'https://api.soon.games/?platform=XBONE&type=NEW',
        'https://api.soon.games/?platform=XBONE&type=COMING_SOON',
        'https://api.soon.games/?platform=3DS&type=COMING_SOON',
        'https://api.soon.games/?platform=PC&type=COMING_SOON',
        'https://api.soon.games/?platform=PS4&type=COMING_SOON',
        'https://api.soon.games/?platform=SWITCH&type=COMING_SOON'
      ],
      responseStrategy: 'network-first'
    }),
  ],
};

module.exports = config;
