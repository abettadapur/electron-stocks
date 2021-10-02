import { BrowserWindow } from "electron";
import path from "path";
import { htmlDir, preload } from "main/paths";
import { ipcMain } from "electron";
import os from "os";
import { isProduction } from "main/appConfig";

export class __WindowService {
  private _windows: { [windowId: number]: BrowserWindow } = {};

  constructor() {
    ipcMain.on("window/close", this._onCloseWindow.bind(this));
    ipcMain.on("window/minimize", this._onMinimizeWindow.bind(this));
    ipcMain.on("window/maximize", this._onMaximizeWindow.bind(this));
    ipcMain.on("window/unmaximize", this._onUnmaximizeWindow.bind(this));
    ipcMain.on("window/isMaximized", this._isMaximized.bind(this));

    console.log("HTML", htmlDir);
    console.log("PRELOAD", preload);
  }

  public createTasksWindow() {
    const win = new BrowserWindow({
      show: false,
      resizable: true, // Have this on by default, so Windows OS snaps correctly (https://github.com/electron/electron/issues/11568)
      frame: false,
      titleBarStyle: os.platform() === "darwin" ? "hidden" : undefined,
      webPreferences: {
        nativeWindowOpen: true,
        preload: preload,
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
      if (!isProduction()) {
        win.webContents.openDevTools({ mode: "undocked", activate: true });
      }
    });

    win.on("maximize", () => {
      win.webContents.send("window/onMaximize");
    });

    win.on("unmaximize", () => {
      win.webContents.send("window/onUnmaximize");
    });
  }

  private _onCloseWindow(event: Electron.IpcMainEvent): void {
    const win = this._windows[event.sender.id];

    if (!win) {
      return;
    }

    win.close();
  }

  private _onMinimizeWindow(event: Electron.IpcMainEvent): void {
    const win = this._windows[event.sender.id];

    if (!win) {
      return;
    }

    win.minimize();
  }

  private _onMaximizeWindow(event: Electron.IpcMainEvent): void {
    const win = this._windows[event.sender.id];

    if (!win) {
      return;
    }

    win.maximize();
  }

  private _onUnmaximizeWindow(event: Electron.IpcMainEvent): void {
    const win = this._windows[event.sender.id];

    if (!win) {
      return;
    }

    win.unmaximize();
  }

  private _isMaximized(event: Electron.IpcMainEvent): void {
    const win = this._windows[event.sender.id];

    if (!win) {
      event.returnValue = false;
    } else {
      event.returnValue = win.isMaximized();
    }
  }
}

export default new __WindowService();
