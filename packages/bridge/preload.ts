var WebSocket = require("ws");

var handlers = [];
var SUBSCRIPTION_ID;
var ws;

const bridge = {
  createSocket: function (initialTickers) {
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

    ws.on("message", function (data, flags) {
      handlers.forEach((h) => {
        h(data, flags);
      });
    });
  },
  addEventListener: function (f) {
    if (f) {
      handlers.push(f);
    }
    return () => {
      handlers = handlers.filter((h) => h !== f);
    };
  },
  addTicker: function (ticker) {
    var subscribe = {
      eventName: "subscribe",
      authorization: "f3868f7ec3aae26d831fc2777efe8a6717135b61",
      eventData: {
        thresholdLevel: 0,
        //'subscriptionId': SUBSCRIPTION_ID,
        tickers: [ticker],
      },
    };
    if (ticker) {
      ws.send(JSON.stringify(subscribe));
    }
  },
  addTickers: function (tickers) {
    var subscribe = {
      eventName: "subscribe",
      authorization: "f3868f7ec3aae26d831fc2777efe8a6717135b61",
      eventData: {
        thresholdLevel: 0,
        //'subscriptionId': SUBSCRIPTION_ID,
        tickers: tickers,
      },
    };
    if (tickers) {
      ws.send(JSON.stringify(subscribe));
    }
  },
};

window.bridge = bridge;

export type Bridge = typeof bridge;

