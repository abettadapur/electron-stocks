import { call, put, select, takeLatest } from "redux-saga/effects";
import { StocksActions } from "./StocksActions";
import { getWatchlist } from "./StocksSelectors";

export default function* StocksSaga() {
  yield call(loadWatchlist);

  yield takeLatest(StocksActions.addTickerToWatchlist.type, saveWatchlist);
}

function* loadWatchlist() {
  const savedWatchlistJSON = yield call(
    [localStorage, localStorage.getItem],
    "watchlist"
  );

  if (savedWatchlistJSON) {
    try {
      const watchlist = JSON.parse(savedWatchlistJSON);
      yield put(StocksActions.setWatchlist(watchlist));
    } catch (e) {
      yield call([localStorage, localStorage.removeItem], "watchlist");
    }
  }
}

function* saveWatchlist() {
  const currentWatchlist: string[] = yield select(getWatchlist);
  const currentWatchlistJSON = JSON.stringify(currentWatchlist);
  yield call(
    [localStorage, localStorage.setItem],
    "watchlist",
    currentWatchlistJSON
  );
}
