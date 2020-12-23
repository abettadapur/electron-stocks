export type StocksState = {
  menuBar: {
    menuItem: string;
  };

  watchlist: string[];
  selected: string;
  selectedPeriod: Period;
};

export type StocksAwareState = {
  stocks: StocksState;
};

export type Period = '1d' | '5d' | '1m' | '6m' | 'ytd';

export type TiingoHistoricalPeriod = 'daily' | 'weekly' | 'monthly' | 'annually';