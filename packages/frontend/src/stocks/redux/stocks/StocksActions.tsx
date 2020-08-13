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

  setWatchlist: actionCreator(
    "stocks/setWatchlist" as const,
    (watchlist: string[]) => ({ watchlist })
  ),
};

export type StocksAction = ActionsUnion<typeof StocksActions>;
