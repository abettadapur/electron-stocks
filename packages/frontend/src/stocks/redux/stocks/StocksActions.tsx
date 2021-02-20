import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { ActionsUnion, actionCreator } from "../utils/actionUtils";
import { Period } from "./Stocks.types";

export const StocksActions = {
  foo: actionCreator("stocks/foo" as const, (fooPayload: string) => ({
    fooPayload,
  })),
  menuSelect: actionCreator(
    "stocks/menuSelect" as const,
    (menuSelectPayload: string) => ({
      menuSelectPayload,
    })
  ),

  addTickerToWatchlist: actionCreator(
    "stocks/addTickerToWatchlist" as const,
    (ticker: string) => ({ ticker })
  ),

  removeTickerFromWatchlist: actionCreator(
    "stocks/removeTickerFromWatchlist" as const,
    (ticker: string) => ({ ticker })
  ),

  setWatchlist: actionCreator(
    "stocks/setWatchlist" as const,
    (watchlist: string[]) => ({ watchlist })
  ),

  setSelectedStock: actionCreator(
    "stocks/setSelectedStock" as const,
    (ticker: string) => ({ ticker })
  ),

  setSelectedPeriod: actionCreator(
    "stocks/setSelectedPeriod" as const,
    (period: Period) => ({ period })
  ),

  quoteLoaded: actionCreator(
    "stocks/quoteLoaded" as const,
    (ticker: string, quote: IEXStockQuote) => ({ ticker, quote })
  ),
  historicalLoaded: actionCreator(
    "stocks/historicalLoaded" as const,
    (
      ticker: string,
      period: Period,
      historical: IEXHistorical[] | EODHistorical[]
    ) => ({
      ticker,
      period,
      historical,
    })
  ),
  setTickerInvalid: actionCreator(
    "stocks/tickerInvalid" as const,
    (invalid: boolean) => ({ invalid })
  ),
  updateQuoteWithSocketInfo: actionCreator(
    "stocks/updateQuoteWithSocketInfo" as const,
    (date: Date, ticker: string, lastPrice: number) => ({ date, ticker, lastPrice })
  )
};

export type StocksAction = ActionsUnion<typeof StocksActions>;
