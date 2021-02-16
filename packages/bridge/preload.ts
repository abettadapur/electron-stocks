var WebSocket = require('ws');

var handlers = []

window.bridge = {
  createSocket: function () {
    var ws = new WebSocket('wss://api.tiingo.com/test');

    var subscribe = {
      'eventName': 'subscribe',
      'authorization': 'f3868f7ec3aae26d831fc2777efe8a6717135b61',
      'eventData': {
        'thresholdLevel': 0,
        'tickers': ['spy', 'uso']
      }
    }

    ws.on('open', function open() {
      ws.send(JSON.stringify(subscribe));
    });

    ws.on('message', function (data, flags) {
      handlers.forEach((h) => {
        h(data, flags);
      });
    });
  },
  addEventListener: function (f) {
    if (f) {
      handlers.push(f);
    }
    return () => { handlers = handlers.filter(h => h !== f) };
  }
}