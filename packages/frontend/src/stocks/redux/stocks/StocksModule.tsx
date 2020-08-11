import StocksReducer from "./StocksReducer";
import StocksSaga from "./StocksSaga";

const StocksModule = {
  id: "stocks",
  reducerMap: { stocks: StocksReducer },
  sagas: [StocksSaga],
};

export default StocksModule;
