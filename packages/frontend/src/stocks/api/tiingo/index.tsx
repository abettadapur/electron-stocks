import makeApiRequest from "./utils/makeApiRequest";
import StockQuote from "./models/EODStockQuote";
import IEXStockQuote from "./models/IEXStockQuote";

export async function getEODStockQuote(ticker: string) {
  const result = await makeApiRequest(`tiingo/daily/${ticker}/prices`);
  const quote = StockQuote.fromApiModel(ticker, result[0]);
  return quote;
}

export async function getIntradayQuote(ticker: string) {
  const result = await makeApiRequest(`iex/${ticker}`);
  const intradayQuote = IEXStockQuote.fromApiModel(result[0]);

  return intradayQuote;
}

export async function getQuotesForWatchlist(watchlist: string[]) {
  return Promise.all(watchlist.map(ticker => getIntradayQuote(ticker)));
}
