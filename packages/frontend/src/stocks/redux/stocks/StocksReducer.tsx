import { makeReducer } from "../utils/reducerUtils";
import { StocksState } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  { watchlist: [], menuBar: { menuItem: "stocks" }, selected: '' },
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
    }
  }
);

export default StocksReducer;
