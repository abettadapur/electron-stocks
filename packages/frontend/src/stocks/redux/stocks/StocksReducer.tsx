import { makeReducer } from "../utils/reducerUtils";
import { StocksState } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  { foo: "", menuBar: { menuItem: 'Stocks' } },
  (state: StocksState, action: StocksAction) => {
    switch (action.type) {
      case StocksActions.foo.type: {
        state.foo = action.payload.fooPayload;
        break;
      }
      case StocksActions.menuSelect.type: {
        state.menuBar.menuItem = action.payload.menuSelectPayload;
        break;
      }
    }
  }
);

export default StocksReducer;
