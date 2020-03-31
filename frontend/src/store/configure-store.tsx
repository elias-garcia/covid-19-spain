import { createStore, applyMiddleware, combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { History } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import State from "./state";
import appReducer from "../components/app/app.reducer";
import dashboardReducer from "../components/routes/dashboard/dashboard.reducer";
import * as dashboardEpics from "../components/routes/dashboard/dashboard.epics";

const createRootReducer = (history: History) =>
  combineReducers<State>({
    app: appReducer,
    dashboard: dashboardReducer,
    router: connectRouter(history),
  });

const rootEpic = combineEpics(
  dashboardEpics.loadDataEpic,
  dashboardEpics.loadReportsEpic,
  dashboardEpics.loadAccumulatedValuesEpic
);

const configureStore = (history: History) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(createRootReducer(history), composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
