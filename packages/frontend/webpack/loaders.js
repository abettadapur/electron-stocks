/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

const path = require("path");

const moduleLoaders = () => {
  const cacheIdentifier = "tasks";
  return {
    resolve: { extensions: [".js", ".ts", ".tsx", ".json"] },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "cache-loader",
              options: {
                cacheIdentifier,
              },
            },
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
  };
};

module.exports = moduleLoaders;
