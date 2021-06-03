import { StocksAwareState } from "./Stocks.types";
import { createSelector } from "reselect";

export function getWatchlist(state: StocksAwareState) {
  return Array.from(state.stocks.watchlist);
}

export function getSelectedTicker(state: StocksAwareState) {
  return state.stocks.selected;
}

export function getSelectedPeriod(state: StocksAwareState) {
  return state.stocks.selectedPeriod;
}

export function getQuote(state: StocksAwareState, ticker: string) {
  return state.stocks.quotes[ticker];
}

export function getQuotes(state: StocksAwareState) {
  return state.stocks.quotes;
}

export function getSelectedHistoricalData(state: StocksAwareState) {
  return state.stocks.historicalData?.[getSelectedTicker(state)]?.[
    getSelectedPeriod(state)
  ];
}

export function getMetadataForStock(state: StocksAwareState, ticker: string) {
  return state.stocks.metadata[ticker];
}

export const selectIsSelectedTickerInWatchlist = createSelector(
  (s) => s.stocks.watchlist,
  getSelectedTicker,
  (watchlist, ticker) => {
    return watchlist.has(ticker.toLowerCase()) || watchlist.has(ticker);
  }
);
