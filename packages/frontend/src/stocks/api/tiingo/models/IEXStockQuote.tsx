export default class IEXStockQuote {
  public get symbol() {
    return this._symbol;
  }
  public get open() {
    return this._open;
  }
  public get high() {
    return this._high;
  }
  public get low() {
    return this._low;
  }
  public get price() {
    return this._price;
  }
  public get volume() {
    return this._volume;
  }
  public get timestamp() {
    return this._timestamp;
  }
  public get prevClose() {
    return this._prevClose;
  }

  constructor(
    private _symbol: string,
    private _open: number,
    private _high: number,
    private _low: number,
    private _price: number,
    private _prevClose: number,
    private _volume: number,
    private _timestamp: Date
  ) { }

  public static fromApiModel(model: object): IEXStockQuote | void {
    if (model) {
      return new IEXStockQuote(
        model["ticker"],
        model["open"],
        model["high"],
        model["low"],
        model["last"],
        model["prevClose"],
        model["volume"],
        new Date(Date.parse(model["timestamp"]))
      );
    }
    return undefined;
  }
}
