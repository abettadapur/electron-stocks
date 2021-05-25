/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "12.0.0",
        },
      },
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: [__dirname],
        cwd: __dirname,
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          main: "./src",
        },
      },
    ],
  ],
};
