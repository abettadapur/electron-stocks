/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

module.exports = {
  presets: [
    ['@babel/env', {targets: {chrome: 80}, useBuiltIns: false}],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'emotion',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: [__dirname],
        cwd: __dirname,
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          frontend: './src',
          ui: './src/ui',
        },
      },
    ],
  ],
};
