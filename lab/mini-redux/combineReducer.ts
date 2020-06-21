type Reducer<S, A> = (state: S | undefined, action: A) => S;
type ReducersMapObject<S, A> = {
  [K in keyof S]: Reducer<S[K], A>;
};

/**
 * 聚合多个state
 */
function combineReducers<S, A>(reducers: ReducersMapObject<S, A>) {
  let stateKeys: Array<keyof S> = Object.keys(reducreducers);
  let newState = {};
  stateKeys.forEach((key) => {
    const curReducer = reducers[key];
    let curState = curReducer(action);
  });
}
