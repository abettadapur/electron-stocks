import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "frontend/tasks/redux/createStore";
import Tasks from "frontend/tasks/ui/Tasks";

function TasksRoot(props: { store: any }) {
  return (
    <Provider store={props.store}>
      {/* <UIRoot pageTitle="messenger" storeIsAvailable> */}
      <Tasks />
      {/* </UIRoot> */}
    </Provider>
  );
}

const container = document.getElementById("root");
const store = createStore();

if (container) {
  ReactDOM.render(<TasksRoot store={store} />, container);
}

if (__DEV__) {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
  }
}
