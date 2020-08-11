import { makeReducer } from "../utils/reducerUtils";
import { StocksState } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";

const StocksReducer = makeReducer(
  { foo: "" },
  (state: StocksState, action: StocksAction) => {
    switch (action.type) {
      case StocksActions.foo.type: {
        state.foo = action.payload.fooPayload;
        break;
      }
    }
  }
);

export default StocksReducer;