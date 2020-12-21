import { makeReducer } from "../utils/reducerUtils";
import { StocksState, Period } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  { watchlist: [], menuBar: { menuItem: "stocks" }, selected: '', selectedPeriod: '1d' as Period },
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
        state.watchlist.splice(state.watchlist.indexOf(action.payload.ticker.toLowerCase()), 1);
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
    }
  }
);

export default StocksReducer;
