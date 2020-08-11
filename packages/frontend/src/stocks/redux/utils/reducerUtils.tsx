import produce, { Draft } from "immer";

export function makeReducer<S, A>(
  initialState: S,
  reducer: (state: Draft<S>, action: A) => void
): (state: S | undefined, action: A) => S {
  return (state: S | undefined, action: A) => {
    return produce(state || initialState, (draft) => reducer(draft, action));
  };
}
