import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import appReducer from "../app/reducers/app.reducer";
import State from "./state";

const rootReducer = combineReducers<State>({
  app: appReducer,
});

const configureStore = () => {
  const middlewares = [createEpicMiddleware()];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  return store;
};

export default configureStore;
