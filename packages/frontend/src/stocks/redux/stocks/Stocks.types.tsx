export type StocksState = {
  foo: string;
  menuBar: {
    menuItem: string;
  }
};

export type StocksAwareState = {
  stocks: StocksAwareState;
};
