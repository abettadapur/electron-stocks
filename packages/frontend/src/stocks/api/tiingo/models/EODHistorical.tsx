export default class EODHistorical {

  public get date() {
    return this._date;
  }
  public get close() {
    return this._close;
  }
  public get high() {
    return this._high;
  }
  public get low() {
    return this._low;
  }
  public get open() {
    return this._open;
  }

  constructor(
    private _date: Date,
    private _close: number,
    private _high: number,
    private _low: number,
    private _open: number
  ) { }

  public static fromApiModel(model: object): EODHistorical {
    return new EODHistorical(
      new Date(Date.parse(model["date"])),
      model["adjClose"],
      model["adjHigh"],
      model["adjLow"],
      model["adjOpen"]
    );
  }

  public static fromApiModelList(model: object[]): EODHistorical[] {
    return model.map((item) => this.fromApiModel(item));
  }
}
