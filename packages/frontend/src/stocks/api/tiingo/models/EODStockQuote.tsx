export default class StockQuote {
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
  public get date() {
    return this._date;
  }

  constructor(
    private _symbol: string,
    private _open: number,
    private _high: number,
    private _low: number,
    private _price: number,
    private _volume: number,
    private _date: Date
  ) {}

  public static fromApiModel(ticker: string, model: object): StockQuote {
    return new StockQuote(
      ticker,
      model["open"],
      model["high"],
      model["low"],
      model["close"],
      model["volume"],
      new Date(Date.parse(model["date"]))
    );
  }
}
