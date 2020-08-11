export type StocksState = {
  foo: string;
};

export type StocksAwareState = {
  stocks: StocksAwareState;
};
