/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

const webpack = require('webpack');
const moduleLoaders = require('./loaders');
const {getEntryConfig} = require('./entries');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

function generateDevelopmentConfig() {
  return {
    mode: 'development',
    entry: getEntryConfig(true /* include dev scripts */),
    // See https://webpack.js.org/configuration/devtool/ for the devtool options
    // This is the best option for development because it provides high fidelity sourcemaps
    // while also being quick for incremental builds
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: '[name].bundle.js',
      publicPath: 'http://localhost:9000/',
    },
    externals: {
      'electron-fetch': 'electron-fetch', // Exclude this bundle from any renderer process code
    },
    ...moduleLoaders(),
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
      }),
      new CaseSensitivePathsPlugin(),
    ],
  };
}

module.exports = generateDevelopmentConfig;