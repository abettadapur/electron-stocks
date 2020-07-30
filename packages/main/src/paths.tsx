import path from "path";
import { isProduction } from "./appConfig";

export const buildDir = isProduction()
  ? path.resolve(__dirname, "..")
  : path.resolve(__dirname, "..", "..", "..", "build");

export const htmlDir = isProduction()
  ? buildDir
  : path.resolve(__dirname, "..", "html");
