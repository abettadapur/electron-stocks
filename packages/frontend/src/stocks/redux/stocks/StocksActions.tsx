import { ActionsUnion, actionCreator } from "../utils/actionUtils";

export const StocksActions = {
  foo: actionCreator("stocks/foo" as const, (fooPayload: string) => ({
    fooPayload,
  })),
  menuSelect: actionCreator("stocks/menuSelect", (menuSelectPayload: string) => ({
    menuSelectPayload
  }))
};

export type StocksAction = ActionsUnion<typeof StocksActions>;
