/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

module.exports = function babelConfig(api) {
  api.cache.never();
  return {
    babelrc: true,
    babelrcRoots: [
      // Keep the root as a root
      ".",
      // Also consider monorepo packages "root" and load their .babelrc files.
      "./packages/*",
      "./assets/*",
    ],
    presets: ["@babel/typescript"],
    plugins: [
      "@babel/plugin-transform-modules-commonjs",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "babel-plugin-fbt",
      "babel-plugin-fbt-runtime",
    ],
  };
};
