import EODHistorical from "frontend/stocks/api/tiingo/models/EODHistorical";
import IEXHistorical from "frontend/stocks/api/tiingo/models/IEXHistorical";
import { IEXStockQuote } from "frontend/stocks/api/tiingo/models/IEXStockQuote";
import { StockMetadata } from "frontend/stocks/api/tiingo/models/StockMetadata";
import { ModalType } from "frontend/stocks/ui/components/Modals";

export type StocksState = {
  menuBar: {
    menuItem: string;
  };
  historicalData: {
    [ticker: string]: { [period in Period]: IEXHistorical[] | EODHistorical[] };
  };
  metadata: {
    [ticker: string]: StockMetadata;
  };
  quotes: { [ticker: string]: IEXStockQuote };
  watchlist: Set<string>;
  selected: string;
  selectedPeriod: Period;
  tickerInvalid: boolean;
  activeModal: ModalType | null;
};

export type StocksAwareState = {
  stocks: StocksState;
};

export type Period = "1d" | "5d" | "1m" | "6m" | "ytd" | "1y" | "5y";

export type TiingoHistoricalPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "annually";
