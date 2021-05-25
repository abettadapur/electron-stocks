import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "frontend/stocks/redux/createStore";
import Stocks from "frontend/stocks/ui/Stocks";
import UIRoot from "frontend/stocks/ui/UIRoot";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";

function StocksRoot(props: { store: any }) {
  return (
    <Provider store={props.store}>
      <UIRoot>
        <Stocks />
      </UIRoot>
    </Provider>
  );
}

const container = document.getElementById("root");
const store = createStore();




library.add(faTimesCircle);
dom.watch();

if (container) {
  ReactDOM.render(<StocksRoot store={store} />, container);
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
