import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import StocksModule from "./stocks/StocksModule";

export default function createTasksStore() {
  return createStore(
    {
      initialState: {},
      extensions: [getSagaExtension(undefined, () => {})],
    },
    // @ts-ignore These types are all fucked, whatever
    StocksModule
  );
}
