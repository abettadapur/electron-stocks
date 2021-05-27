import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { enableMapSet } from "immer";
import createStore from "frontend/stocks/redux/createStore";
import Stocks from "frontend/stocks/ui/Stocks";
import UIRoot from "frontend/stocks/ui/UIRoot";

function StocksRoot(props: { store: any }) {
  return (
    <Provider store={props.store}>
      <UIRoot>
        <Stocks />
      </UIRoot>
    </Provider>
  );
}

enableMapSet();
const container = document.getElementById("root");
const store = createStore();

if (container) {
  ReactDOM.render(<StocksRoot store={store} />, container);
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
