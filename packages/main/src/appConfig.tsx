import { app } from "electron";

export function isProduction() {
  return app.isPackaged;
}
