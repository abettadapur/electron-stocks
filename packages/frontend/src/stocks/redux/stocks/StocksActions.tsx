import { ActionsUnion, actionCreator } from "../utils/actionUtils";

export const StocksActions = {
  foo: actionCreator("stocks/foo" as const, (fooPayload: string) => ({
    fooPayload,
  })),
};

export type StocksAction = ActionsUnion<typeof StocksActions>;
