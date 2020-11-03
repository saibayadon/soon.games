process.traceDeprecation = true;

// Require
const { resolve } = require('path');

const buildPath = resolve(__dirname, 'build');
const mainPath = resolve(__dirname, 'src', 'index.js');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const WorkboxPlugin = require('workbox-webpack-plugin');

const config = {
  mode: 'development',
  entry: [mainPath, 'webpack-plugin-serve/client'],
  devtool: 'inline-source-map',
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  optimization: {
    chunkIds: 'named',
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new WebpackPluginServe({
      port: 3000,
      static: buildPath,
      historyFallback: true,
    }),
    new ESLintPlugin({
      cache: true,
      files: './src',
    }),
    new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('http://localhost:3000'),
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('https://api.soon.games'),
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ],
  watch: true,
};

module.exports = config;
