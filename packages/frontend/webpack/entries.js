/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @format
 */

const { getEntryPoints } = require("../../../scripts/htmlGenerator");
const path = require("path");

function getEntryConfig(includeDevScripts) {
  const entryPoints = getEntryPoints();
  const entryConfig = {};
  if (includeDevScripts) {
    entryPoints.forEach((entry) => {
      entryConfig[entry] = [
        "webpack-dev-server/client?http://localhost:9999",
        "webpack/hot/only-dev-server",
        "./packages/frontend/src/beforeEntry.tsx",
        `./packages/frontend/src/entry/${entry}.tsx`,
      ];
    });
  } else {
    entryPoints.forEach((entry) => {
      entryConfig[entry] = [
        path.join(__dirname, "..", "src/beforeEntry.tsx"),
        path.join(__dirname, "..", `src/entry/${entry}.tsx`),
      ];
    });
  }

  return entryConfig;
}

module.exports = {
  getEntryConfig,
};
