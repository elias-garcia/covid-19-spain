import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import State from "./state";
import appReducer from "../app/reducers/app.reducer";
import dashboardReducer from "../app/views/dashboard/reducers/dashboard.reducer";
import * as dashboardEpics from "../app/views/dashboard/reducers/dashboard.epics";

const rootReducer = combineReducers<State>({
  app: appReducer,
  dashboard: dashboardReducer,
});

const rootEpic = combineEpics(
  dashboardEpics.loadDataEpic,
  dashboardEpics.loadReportsEpic,
  dashboardEpics.loadAccumulatedValuesEpic
);

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
