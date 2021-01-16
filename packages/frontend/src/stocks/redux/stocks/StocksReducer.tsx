import { makeReducer } from "../utils/reducerUtils";
import { StocksState, Period } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  {
    watchlist: [],
    menuBar: { menuItem: "stocks" },
    selected: "",
    selectedPeriod: "1d" as Period,
    historicalData: {},
    quotes: {},
  },
  (state: StocksState, action: StocksAction) => {
    switch (action.type) {
      case StocksActions.menuSelect.type: {
        state.menuBar.menuItem = action.payload.menuSelectPayload;
        break;
      }

      case StocksActions.addTickerToWatchlist.type: {
        state.watchlist.push(action.payload.ticker);
        break;
      }

      case StocksActions.removeTickerFromWatchlist.type: {
        state.watchlist.splice(
          state.watchlist.indexOf(action.payload.ticker.toLowerCase()),
          1
        );
        break;
      }

      case StocksActions.setWatchlist.type: {
        state.watchlist = action.payload.watchlist;
        break;
      }

      case StocksActions.setSelectedStock.type: {
        state.selected = action.payload.ticker;
        break;
      }

      case StocksActions.setSelectedPeriod.type: {
        state.selectedPeriod = action.payload.period;
        break;
      }

      case StocksActions.quoteLoaded.type: {
        state.quotes[action.payload.ticker] = action.payload.quote;
        break;
      }

      case StocksActions.historicalLoaded.type: {
        if (!state.historicalData[action.payload.ticker]) {
          state.historicalData[action.payload.ticker] = {
            "1d": [],
            "1m": [],
            "5d": [],
            "6m": [],
            ytd: [],
          };
        }

        state.historicalData[action.payload.ticker][action.payload.period] =
          action.payload.historical;
        break;
      }
    }
  }
);

export default StocksReducer;
