export type StocksState = {
  menuBar: {
    menuItem: string;
  };

  watchlist: string[];
  selected: string;
};

export type StocksAwareState = {
  stocks: StocksState;
};
