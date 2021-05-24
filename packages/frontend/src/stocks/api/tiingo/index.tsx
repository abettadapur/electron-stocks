import makeApiRequest from "./utils/makeApiRequest";
import StockQuote from "./models/EODStockQuote";
import { iexStockQuoteFromApiModel } from "./models/IEXStockQuote";
import EODHistorical from "./models/EODHistorical";
import { TiingoHistoricalPeriod } from "frontend/stocks/redux/stocks/Stocks.types";
import IEXHistorical from "./models/IEXHistorical";

export async function getEODStockQuote(ticker: string) {
  const result = await makeApiRequest(`tiingo/daily/${ticker}/prices`);
  const quote = StockQuote.fromApiModel(ticker, result[0]);
  return quote;
}

export async function getIntradayQuote(ticker: string) {
  const result = await makeApiRequest(`iex/${ticker}`);
  const intradayQuote = iexStockQuoteFromApiModel(result[0]);

  return intradayQuote;
}

export async function getQuotesForWatchlist(watchlist: string[]) {
  return Promise.all(watchlist.map(ticker => getIntradayQuote(ticker)));
}

export async function getEODHistoricalData(ticker: string, startDate: string, endDate: string, resampleFreq: TiingoHistoricalPeriod) {
  const result = await makeApiRequest(`tiingo/daily/${ticker}/prices`, {
    format: 'json',
    startDate,
    endDate,
    resampleFreq
  });
  const historicalData = EODHistorical.fromApiModelList(result);
  return historicalData;
}

export async function getIEXHistoricalData(ticker: string, startDate: string, endDate: string, period: string) {
  let nums = period.match(/\d/);
  const periodLength = nums ? nums[0] : 1;

  const result = await makeApiRequest(`iex/${ticker}/prices`, {
    startDate,
    endDate,
    resampleFreq: `${periodLength}min`
  });
  const historicalData = IEXHistorical.fromApiModelList(result);
  return historicalData;
}
