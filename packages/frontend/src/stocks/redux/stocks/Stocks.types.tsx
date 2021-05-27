import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";

export type StocksState = {
  menuBar: {
    menuItem: string;
  };
  historicalData: {
    [ticker: string]: { [period in Period]: IEXHistorical[] | EODHistorical[] };
  };
  quotes: { [ticker: string]: IEXStockQuote };
  watchlist: Set<string>;
  selected: string;
  selectedPeriod: Period;
  tickerInvalid: boolean;
};

export type StocksAwareState = {
  stocks: StocksState;
};

export type Period = "1d" | "5d" | "1m" | "6m" | "ytd" | "1y" | "5y";

export type TiingoHistoricalPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "annually";
