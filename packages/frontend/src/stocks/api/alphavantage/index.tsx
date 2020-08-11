import makeApiRequest from "./utils/makeApiRequest";
import StockQuote from "./models/StockQuote";

export async function getStockQuote(ticker: string): Promise<StockQuote> {
  const json = await makeApiRequest({
    function: "GLOBAL_QUOTE",
    symbol: ticker,
  });
  const stockQuote = StockQuote.fromApiModel(json);

  return stockQuote;
}
