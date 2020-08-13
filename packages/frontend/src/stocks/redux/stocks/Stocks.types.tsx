export type StocksState = {
  menuBar: {
    menuItem: string;
  };

  watchlist: string[];
};

export type StocksAwareState = {
  stocks: StocksState;
};
