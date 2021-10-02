/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

const webpack = require("webpack");
const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

function generateProductionConfig() {
  console.log("INPUT", path.join(__dirname, "..", "preload.ts"));
  console.log("OUTPUT", path.resolve(__dirname, "..", "..", "build"));
  return {
    mode: "production",
    target: "electron-main",
    entry: {
      preload: path.join(__dirname, "..", "preload.ts"),
    },
    // See https://webpack.js.org/configuration/devtool/ for the devtool options
    // This is the best option for development because it provides high fidelity sourcemaps
    // while also being quick for incremental builds
    devtool: "cheap-module-eval-source-map",
    output: {
      path: path.resolve(__dirname, "..", "..", "..", "build"),
      filename: "[name].bundle.js",
    },
    node: {
      __dirname: false,
    },
    resolve: { extensions: [".js", ".ts", ".tsx", ".json"] },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                rootMode: "upward",
              },
            },
          ],
        },
        {
          test: /\.((static\.svg)|png|woff2|ttf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets",
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false,
      }),
      new CaseSensitivePathsPlugin(),
    ],
  };
}

module.exports = { generateProductionConfig };
