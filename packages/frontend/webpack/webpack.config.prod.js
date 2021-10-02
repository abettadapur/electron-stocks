/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

const webpack = require("webpack");
const path = require("path");
const moduleLoaders = require("./loaders");
const { getEntryConfig } = require("./entries");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

function generateProductionConfig() {
  return {
    mode: "production",
    entry: getEntryConfig(false /* exclude dev scripts */),
    // See https://webpack.js.org/configuration/devtool/ for the devtool options
    // This is the best option for development because it provides high fidelity sourcemaps
    // while also being quick for incremental builds
    devtool: "cheap-module-eval-source-map",
    output: {
      path: path.resolve(__dirname, "..", "..", "..", "build", "bundles"),
      filename: "[name].bundle.js",
    },
    externals: {
      "electron-fetch": "electron-fetch", // Exclude this bundle from any renderer process code
    },
    ...moduleLoaders(),
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false,
      }),
      new CaseSensitivePathsPlugin(),
    ],
  };
}

module.exports = { generateProductionConfig };
