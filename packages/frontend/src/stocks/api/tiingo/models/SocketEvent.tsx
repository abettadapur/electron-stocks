export function socketEventFromApiModel(model: object): SocketEvent {
  if (model) {
    let socketEvent: SocketEvent = {
      messageType: model["messageType"],
      service: model["service"],
      data: socketEventDataFromApiModel(model["data"]),
    };
    return socketEvent;
  }
  return null;
}

export type SocketEvent = {
  messageType: string;
  service: string;
  data: SocketEventData;
};

function socketEventDataFromApiModel(model: object): SocketEventData {
  if (model) {
    let socketEventData: SocketEventData = {
      updateMessageType: model[0],
      date: model[1],
      nanoseconds: model[2],
      ticker: model[3],
      bidSize: model[4],
      bidPrice: model[5],
      midPrice: model[6],
      askPrice: model[7],
      askSize: model[8],
      lastPrice: model[9],
      lastSize: model[10],
      halted: model[11],
      afterHours: model[12],
      intermarketSweepOrder: model[13],
      oddlot: model[14],
      nmsRule: model[15],
    };
    return socketEventData;
  }
  return null;
}

export type SocketEventData = {
  updateMessageType: string;
  date: Date;
  nanoseconds: number;
  ticker: string;
  bidSize: number;
  bidPrice: number;
  midPrice: number;
  askPrice: number;
  askSize: number;
  lastPrice: number;
  lastSize: number;
  halted: number;
  afterHours: number;
  intermarketSweepOrder: number;
  oddlot: number;
  nmsRule: number;
};
