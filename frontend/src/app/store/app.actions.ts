export const TOGGLE_THEME = "[APP] TOGGLE THEME";

export interface ToggleThemeAction {
  readonly type: typeof TOGGLE_THEME;
}

export type AppAction = ToggleThemeAction;

export const toggleTheme = (): AppAction => ({ type: TOGGLE_THEME });
