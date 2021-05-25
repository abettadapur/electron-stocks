/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

// In development mode, we are not using webpack. Default this webpack provided value to the default require function
/* eslint-disable no-native-reassign */
__non_webpack_require__ = require;

// Define global variables in development
__DEV__ = true;
__SANDBOX__ = undefined;

/* eslint-enable no-native-reassign */

const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const args = yargs(process.argv).options({
  debug: {
    type: "boolean",
    default: false,
    describe: "Build a developer ID distribution",
  },
  sandbox: {
    type: "string",
    describe:
      "Overrides for the default host to point requests to a dev server (e.g. --sandbox svcscm.1234.od)",
  },
}).argv;

require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
});

const { generateDevelopmentHtml } = require("../../../scripts/htmlGenerator");
const { startApplication } = require("./init");
const log = require("electron-log");

global.APP_START = performance.timeOrigin + performance.now();

if (__SANDBOX__) {
  console.log(`ℹ️  Using sandbox ${__SANDBOX__} for requests.`); // eslint-disable-line no-console
  // expose sandbox host to renderer process
  process.env.sandbox = __SANDBOX__;
}

init();

async function init() {
  generateDevelopmentHtml();
  await startWebpackServer();
  startApplication();
}
function startWebpackServer() {
  const port = 9000;
  const webpack = require("webpack");
  const webpackDevServer = require("webpack-dev-server");
  const generateDevelopmentConfig = require("../../frontend/webpack/webpack.config.dev");
  const config = generateDevelopmentConfig();
  const options = {
    hot: true,
    port,
    overlay: true,
    stats: "errors-only",
    noInfo: true,
    clientLogLevel: "none",
    publicPath: "http://localhost:9000/",
    historyApiFallback: true,
  };
  webpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, options);
  server.listen(port, "localhost", () => {
    // eslint-disable-next-line no-console
    console.log("dev server listening on port 9000");
  });
}
