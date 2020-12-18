import { ActionsUnion, actionCreator } from "../utils/actionUtils";

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
  )
};

export type StocksAction = ActionsUnion<typeof StocksActions>;
