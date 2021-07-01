import WebSocket from "ws";
import { ipcRenderer } from "electron";
import os from "os";

let handlers: ((data: object, flags: string[]) => void)[] = [];
let ws: WebSocket;
let subscriptionID: string | undefined;

let maximizeListeners: (() => void)[] = [];
let unmaximizeListeners: (() => void)[] = [];

ipcRenderer.on("window/onMaximize", () => {
  maximizeListeners.forEach((l) => l());
});

ipcRenderer.on("window/onUnmaximize", () => {
  unmaximizeListeners.forEach((l) => l());
});

const bridge = {
  createSocket: function (initialTickers: string[]) {
    ws = new WebSocket("wss://api.tiingo.com/iex");

    var subscribe = {
      eventName: "subscribe",
      authorization: "f3868f7ec3aae26d831fc2777efe8a6717135b61",
      eventData: {
        thresholdLevel: 0,
        tickers: initialTickers,
      },
    };

    ws.on("open", function open() {
      ws.send(JSON.stringify(subscribe));
    });

    ws.on("message", function (data: string, flags: string[]) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.messageType === "I") {
          // Save subscription ID
          subscriptionID = parsedData.data.subscriptionId;
          console.log("Saved subscription", subscriptionID);
        }
        handlers.forEach((h) => {
          h(parsedData, flags);
        });
      } catch (e) {
        console.error("Could not parse websocket message");
      }
    });
  },
  addEventListener: function (f: (data: object, flags: string[]) => void) {
    if (f) {
      handlers.push(f);
    }
    return () => {
      handlers = handlers.filter((h) => h !== f);
    };
  },
  addTicker: function (ticker: string) {
    const subscribe = {
      eventName: "subscribe",
      authorization: "f3868f7ec3aae26d831fc2777efe8a6717135b61",
      eventData: {
        thresholdLevel: 0,
        subscriptionId: subscriptionID,
        tickers: [ticker],
      },
    };
    if (ticker) {
      ws.send(JSON.stringify(subscribe));
    }
  },
  addTickers: function (tickers: string[]) {
    const subscribe = {
      eventName: "subscribe",
      authorization: "f3868f7ec3aae26d831fc2777efe8a6717135b61",
      eventData: {
        thresholdLevel: 0,
        subscriptionId: subscriptionID,
        tickers: tickers,
      },
    };
    if (tickers) {
      ws.send(JSON.stringify(subscribe));
    }
  },

  window: {
    close: () => {
      ipcRenderer.send("window/close");
    },
    minimize: () => {
      ipcRenderer.send("window/minimize");
    },
    maximize: () => {
      ipcRenderer.send("window/maximize");
    },
    unmaximize: () => {
      ipcRenderer.send("window/unmaximize");
    },
    isMaximized: (): boolean => {
      return ipcRenderer.sendSync("window/isMaximized") as boolean;
    },
    onMaximize: (listener: () => void) => {
      maximizeListeners.push(listener);

      return () => {
        maximizeListeners = maximizeListeners.filter((l) => l !== listener);
      };
    },
    onUnmaximize: (listener: () => void) => {
      unmaximizeListeners.push(listener);

      return () => {
        unmaximizeListeners = unmaximizeListeners.filter((l) => l !== listener);
      };
    },
  },
  platform: {
    os() {
      return os.platform();
    },
  },
};

window.bridge = bridge;

export type Bridge = typeof bridge;
