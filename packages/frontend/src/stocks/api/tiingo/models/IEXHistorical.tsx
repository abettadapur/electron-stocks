export default class IEXHistorical {
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
  ) {}

  public static fromApiModel(model: object): IEXHistorical {
    return new IEXHistorical(
      new Date(Date.parse(model["date"])),
      model["close"],
      model["high"],
      model["low"],
      model["open"]
    );
  }

  public static fromApiModelList(model: object[]): IEXHistorical[] {
    return model.map((item) => this.fromApiModel(item));
  }
}
