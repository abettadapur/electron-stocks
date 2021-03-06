import dayjs from "dayjs";
import bridge from "frontend/bridge";
import {
  getEODHistoricalData,
  getIEXHistoricalData,
  getIntradayQuote,
  getStockMetadata,
} from "frontend/stocks/api/tiingo";
import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import {
  SocketEvent,
  socketEventFromApiModel,
} from "frontend/stocks/api/tiingo/models/SocketEvent";
import { StockMetadata } from "frontend/stocks/api/tiingo/models/StockMetadata";
import { eventChannel, SagaIterator } from "redux-saga";
import {
  all,
  call,
  put,
  select,
  takeLatest,
  fork,
  take,
} from "redux-saga/effects";
import { ActionOf } from "../utils/actionUtils";
import { Period } from "./Stocks.types";
import { StocksAction, StocksActions } from "./StocksActions";
import { HISTORICAL_PERIOD_INFO } from "./StocksConstants";
import {
  getMetadataForStock,
  getQuote,
  getSelectedPeriod,
  getSelectedTicker,
  getWatchlist,
} from "./StocksSelectors";

function createSocketChannel() {
  return eventChannel((emitter) => {
    const unsubscribe = bridge.addEventListener(emitter);
    return unsubscribe;
  });
}

function* listenToSocket(channel) {
  while (true) {
    const event = yield take(channel);
    const socketEvent: SocketEvent = socketEventFromApiModel(event);
    console.dir(socketEvent);
    if (
      socketEvent.data &&
      (socketEvent.data.updateMessageType === "T" ||
        socketEvent.data.updateMessageType === "Q")
    ) {
      yield put(
        StocksActions.updateQuoteWithSocketInfo(
          new Date(socketEvent.data.date),
          socketEvent.data.ticker,
          socketEvent.data.lastPrice
        )
      );
    }
  }
}

export default function* StocksSaga() {
  let watchlist = yield call(loadWatchlist);
  yield call(bridge.createSocket, watchlist);
  const socketChannel = yield call(createSocketChannel);
  yield fork(listenToSocket, socketChannel);
  yield call(loadQuotes, watchlist);
  yield takeLatest(StocksActions.addTickerToWatchlist.type, saveWatchlist);
  yield takeLatest(StocksActions.removeTickerFromWatchlist.type, saveWatchlist);
  yield takeLatest(StocksActions.setSelectedStock.type, onStockChanged);
  yield takeLatest(StocksActions.setSelectedPeriod.type, onPeriodChanged);

  if (watchlist && watchlist.length > 0) {
    yield put(StocksActions.setSelectedStock(watchlist[0]));
  }
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
      return watchlist;
    } catch (e) {
      yield call([localStorage, localStorage.removeItem], "watchlist");
    }
  }

  return [];
}

function* saveWatchlist(
  action: ActionOf<StocksAction, typeof StocksActions.addTickerToWatchlist.type>
) {
  const currentWatchlist: string[] = yield select(getWatchlist);
  const currentWatchlistJSON = JSON.stringify(currentWatchlist);
  yield call(
    [localStorage, localStorage.setItem],
    "watchlist",
    currentWatchlistJSON
  );

  yield call(loadIntradayQuote, action.payload.ticker);

  if (action && action.payload.ticker) {
    yield call(bridge.addTicker, action.payload.ticker);
  }
}

function* onStockChanged(
  action: ActionOf<StocksAction, typeof StocksActions.setSelectedStock.type>
) {
  yield call(loadIntradayQuote, action.payload.ticker);
  const selectedPeriod: Period = yield select(getSelectedPeriod);
  yield call(loadHistoricalData, action.payload.ticker, selectedPeriod);
}

function* onPeriodChanged(
  action: ActionOf<StocksAction, typeof StocksActions.setSelectedPeriod.type>
) {
  const currentTicker: string = yield select(getSelectedTicker);
  yield call(loadHistoricalData, currentTicker, action.payload.period);
}

function* loadHistoricalData(ticker: string, period: Period) {
  const mostRecentQuote: IEXStockQuote | undefined = yield select(
    getQuote,
    ticker
  );

  // Invalid ticker in search bar
  if (!mostRecentQuote) {
    yield put(StocksActions.setTickerInvalid(true));
    return;
    //throw new Error("There must be a quote to load historical data");
  } else {
    yield put(StocksActions.setTickerInvalid(false));
  }

  const periodInfo = HISTORICAL_PERIOD_INFO[period];

  let goBackDays;
  // calc ytd days
  if (typeof periodInfo.goBackDays === "function") {
    goBackDays = periodInfo.goBackDays();
  } else {
    goBackDays = periodInfo.goBackDays;
  }

  if (period == "1d" || period == "5d") {
    const startDate = dayjs(mostRecentQuote.timestamp)
      .subtract(goBackDays, "day")
      .format("MM-DD-YYYY");
    const endDate = dayjs(mostRecentQuote.timestamp)
      .add(1, "day")
      .format("MM-DD-YYYY");

    const historicalData: IEXHistorical[] = yield call(
      getIEXHistoricalData,
      ticker,
      startDate,
      endDate,
      period
    );
    yield put(StocksActions.historicalLoaded(ticker, period, historicalData));
  } else {
    let startDate = dayjs(mostRecentQuote.timestamp)
      .subtract(goBackDays, "day")
      .format("MM-DD-YYYY");
    let endDate = dayjs(mostRecentQuote.timestamp).format("MM-DD-YYYY");
    const historicalData: EODHistorical[] = yield call(
      getEODHistoricalData,
      ticker,
      startDate,
      endDate,
      "daily"
    );
    yield put(StocksActions.historicalLoaded(ticker, period, historicalData));
  }
}

function* loadIntradayQuote(ticker: string) {
  yield fork(maybeLoadMetadataForTicker, ticker);
  const quote: IEXStockQuote = yield call(getIntradayQuote, ticker);
  yield put(StocksActions.quoteLoaded(ticker, quote));
}

function* loadQuotes(tickers: string[]) {
  yield all(tickers.map((ticker) => call(loadIntradayQuote, ticker)));
}

function* maybeLoadMetadataForTicker(ticker: string): SagaIterator {
  const metadata: StockMetadata | undefined = yield select(
    getMetadataForStock,
    ticker
  );

  if (metadata) {
    return;
  }

  const stockMetadata = yield call(getStockMetadata, ticker);

  yield put(StocksActions.metadataLoaded(ticker, stockMetadata));
}
