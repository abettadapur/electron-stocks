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
  public get prevClose() {
    return this._prevClose;
  }
  public get change() {
    return this._change;
  }
  public get changePercent() {
    return this._changePercent;
  }

  constructor(
    private _symbol: string,
    private _open: number,
    private _high: number,
    private _low: number,
    private _price: number,
    private _volume: number,
    private _prevClose: number,
    private _change: number,
    private _changePercent: string
  ) {}

  public static fromApiModel(model: object): StockQuote {
    const quote = model["Global Quote"];
    return new StockQuote(
      quote["01. symbol"],
      Number.parseFloat(quote["02. open"]),
      Number.parseFloat(quote["03. high"]),
      Number.parseFloat(quote["04. low"]),
      Number.parseFloat(quote["05. price"]),
      Number.parseFloat(quote["06. volume"]),
      quote["08. previous close"],
      Number.parseFloat(quote["09. change"]),
      quote["10. change percent"]
    );
  }
}
