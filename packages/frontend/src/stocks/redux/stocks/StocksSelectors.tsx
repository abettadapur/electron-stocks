import { StocksAwareState } from "./Stocks.types";

export function getWatchlist(state: StocksAwareState) {
  return state.stocks.watchlist;
}
