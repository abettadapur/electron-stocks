import webpack from "webpack";
import { generateProductionConfig as generateMainConfig } from "../packages/main/webpack/config.prod";
import { generateProductionConfig as generateFrontendConfig } from "../packages/frontend/webpack/webpack.config.prod";
import { generateProductionConfig as generateBridgeConfig } from "../packages/bridge/webpack/config.prod";
import { generateProductionHtml } from "./htmlGenerator";
import * as builder from "electron-builder";
import path from "path";
import fs from "fs";

async function buildWebpack(config: Object) {
  await new Promise((resolve, reject) =>
    webpack(config).run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.toJson().errors);
        reject(err || stats.toJson().errors);
      } else {
        resolve(stats);
      }
    })
  );
}

async function compile() {
  await Promise.all([
    buildWebpack(generateMainConfig()),
    buildWebpack(generateBridgeConfig()),
    buildWebpack(generateFrontendConfig()),
  ]);
}

async function generateHTML() {
  generateProductionHtml();
}

function writePackageJSON() {
  fs.writeFileSync(
    path.resolve(__dirname, "..", "build", "package.json"),
    JSON.stringify({
      name: "Stocks",
      version: "1.0.0",
      main: "main.bundle.js",
      license: "MIT",
    }),
    {
      encoding: "utf-8",
    }
  );
}

async function createPackage() {
  const Platform = builder.Platform;

  await builder.build({
    targets: Platform.MAC.createTarget("dmg"),
    config: {
      appId: "com.bettadapur.stocks",
      productName: "Stocks",
      artifactName: "Stocks.dmg",
      directories: {
        output: path.resolve(__dirname, "..", "dist"),
        app: path.resolve(__dirname, "..", "build"),
      },
    },
  });

  await builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      appId: "com.bettadapur.stocks",
      productName: "Stocks",
      artifactName: "Stocks.exe",
      directories: {
        output: path.resolve(__dirname, "..", "dist"),
        app: path.resolve(__dirname, "..", "build"),
      },
    },
  });
}

async function main() {
  await compile();
  generateHTML();
  writePackageJSON();
  await createPackage();
}

main();
