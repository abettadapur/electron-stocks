import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

export default function createTasksStore() {
  return createStore({
    initialState: {},
    extensions: [getSagaExtension(undefined, () => {})],
    // TasksModule,
  });
}
