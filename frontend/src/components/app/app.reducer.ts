import { Reducer } from "redux";

import { AppAction, TOGGLE_THEME } from "./app.actions";

export interface AppState {
  readonly title: string;
  readonly themeType: "light" | "dark";
}

const initialAppState: AppState = {
  title: "COVID-19 Spain",
  themeType: "light",
};

const appReducer: Reducer = (
  state: AppState = initialAppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const newTheme = state.themeType === "light" ? "dark" : "light";
      return {
        ...state,
        themeType: newTheme,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
