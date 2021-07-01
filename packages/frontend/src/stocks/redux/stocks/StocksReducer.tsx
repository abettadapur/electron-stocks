import { makeReducer } from "../utils/reducerUtils";
import { StocksState, Period } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  {
    watchlist: new Set<string>(),
    menuBar: { menuItem: "stocks" },
    selected: "",
    selectedPeriod: "1d" as Period,
    historicalData: {},
    quotes: {},
    metadata: {},
    tickerInvalid: false,
    activeModal: null,
  },
  (state: StocksState, action: StocksAction) => {
    switch (action.type) {
      case StocksActions.menuSelect.type: {
        state.menuBar.menuItem = action.payload.menuSelectPayload;
        break;
      }

      case StocksActions.addTickerToWatchlist.type: {
        state.watchlist.add(action.payload.ticker.toLowerCase());
        break;
      }

      case StocksActions.removeTickerFromWatchlist.type: {
        state.watchlist.delete(action.payload.ticker);
        state.watchlist.delete(action.payload.ticker.toLowerCase());
        break;
      }

      case StocksActions.setWatchlist.type: {
        state.watchlist = new Set(action.payload.watchlist);
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

      case StocksActions.metadataLoaded.type: {
        state.metadata[action.payload.ticker] = action.payload.metadata;
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

      case StocksActions.setTickerInvalid.type: {
        state.tickerInvalid = action.payload.invalid;
        break;
      }

      case StocksActions.updateQuoteWithSocketInfo.type: {
        if (
          action.payload.lastPrice != null &&
          action.payload.lastPrice !== 0
        ) {
          if (!state.quotes[action.payload.ticker]) {
            state.quotes[action.payload.ticker] = {};
          }
          state.quotes[action.payload.ticker].price = action.payload.lastPrice;
        }
        break;
      }

      case StocksActions.openModal.type: {
        state.activeModal = action.payload.modal;
        break;
      }

      case StocksActions.closeModal.type: {
        state.activeModal = null;
        break;
      }
    }
  }
);

export default StocksReducer;
