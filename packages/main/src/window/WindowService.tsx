import { BrowserWindow } from "electron";
import path from "path";
import { htmlDir } from "main/paths";

export class __WindowService {
  private _windows = {};
  public createTasksWindow() {
    const win = new BrowserWindow({
      show: false,
      frame: false,
      titleBarStyle: "hidden",
      resizable: true, // Have this on by default, so Windows OS snaps correctly (https://github.com/electron/electron/issues/11568)
      webPreferences: {
        nativeWindowOpen: true,
        // preload:
        //   !makeSecure || !isPortalWindow ? this._getPreloadFile() : undefined,
        // We can't set the __bridge on window from preload unless this option is on
        contextIsolation: false,
        experimentalFeatures: true,
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        webviewTag: true,
      },
    });

    this._windows[win.id] = win;

    const htmlFileName = `stocks.html`;
    const htmlPath = path.resolve(htmlDir, htmlFileName);

    win.loadFile(htmlPath, {
      // Pass the name of the desired route via URL. See frontend/index.js
      hash: "stocks",
      // query: { ...query, ...(partitionId ? { partitionId } : {}) },
    });

    win.on("ready-to-show", () => {
      win.show();
      win.webContents.openDevTools({ mode: "undocked", activate: true });
    });
  }
}

export default new __WindowService();
