import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import StocksModule from "./stocks/StocksModule";

export default function createTasksStore() {
  const store = createStore(
    {
      initialState: {},
      extensions: [getSagaExtension(undefined, () => {})],
    },
    // @ts-ignore These types are all fucked, whatever
    StocksModule
  );

  /// expose for debugging
  // @ts-ignore
  window.__store = store;

  return store;
}
