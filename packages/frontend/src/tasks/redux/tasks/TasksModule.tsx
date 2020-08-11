import { ISagaModule } from "redux-dynamic-modules-saga";
import TasksSaga from "./TasksSaga";

const TasksModule: ISagaModule<any> = {
  id: "tasks",
  sagas: [TasksSaga],
};

export default TasksModule;
