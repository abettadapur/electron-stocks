export type IEXStockQuote = {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  timestamp: Date;
  prevClose: number;
}

export function iexStockQuoteFromApiModel(model: object): IEXStockQuote {
  if (model) {
    let quote: IEXStockQuote = {
      symbol: model["ticker"],
      open: model["open"],
      high: model["high"],
      low: model["low"],
      price: model["last"],
      prevClose: model["prevClose"],
      volume: model["volume"],
      timestamp: new Date(Date.parse(model["timestamp"]))
    };
    return quote;
  }
  return undefined;
}
