import path from "path";
import { isProduction } from "./appConfig";

export const buildDir = isProduction()
  ? path.resolve(__dirname)
  : path.resolve(__dirname, "..", "..", "..", "build");

export const htmlDir = isProduction()
  ? buildDir
  : path.resolve(__dirname, "..", "html");

export const preload = isProduction()
  ? path.join(buildDir, "preload.bundle.js")
  : path.resolve(__dirname, "..", "..", "bridge", "preload.dev.js");
