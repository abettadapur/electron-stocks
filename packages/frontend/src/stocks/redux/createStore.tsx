import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import StocksModule from "./stocks/StocksModule";

export default function createTasksStore() {
  const store = createStore(
    {
      initialState: {},
      //@ts-ignore
      extensions: [getSagaExtension(undefined, (e, i) => {
        setTimeout(() => {
          (e as any).info = i && i.sagaStack;
          throw e;
        }, 0);
      })],
    },
    // @ts-ignore These types are all fucked, whatever
    StocksModule
  );

  /// expose for debugging
  // @ts-ignore
  window.__store = store;

  return store;
}
