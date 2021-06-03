export type StockMetadata = {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  startDate: Date;
  endDate: Date;
};

export function stockMetadataFromApiModel(model: object): StockMetadata {
  if (model) {
    let quote: StockMetadata = {
      symbol: model["ticker"],
      name: model["name"],
      description: model["description"],
      exchange: model["exchangeCode"],
      startDate: new Date(Date.parse(model["startDate"])),
      endDate: new Date(Date.parse(model["endDate"])),
    };
    return quote;
  }
  return undefined;
}
