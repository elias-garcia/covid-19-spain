import Report from "../../../domain/report.interface";

export const LOAD_REPORTS = "[HISTORICAL] LOAD REPORTS";
export const LOAD_REPORTS_SUCCESS = "[HISTORICAL] LOAD REPORTS SUCCESS";
export const LOAD_REPORTS_ERROR = "[HISTORICAL] LOAD REPORTS ERROR";

export interface LoadReportsAction {
  readonly type: typeof LOAD_REPORTS;
}

export interface LoadReportsSuccess {
  readonly type: typeof LOAD_REPORTS_SUCCESS;
  readonly reports: Report[];
}

export interface LoadReportsError {
  readonly type: typeof LOAD_REPORTS_ERROR;
  readonly message: string | string[];
}

export type HistoricalAction =
  | LoadReportsAction
  | LoadReportsSuccess
  | LoadReportsError;

export const loadReports = (): HistoricalAction => ({ type: LOAD_REPORTS });
export const loadReportsSuccess = (reports: Report[]): HistoricalAction => ({
  type: LOAD_REPORTS_SUCCESS,
  reports,
});
export const loadReportsError = (
  message: string | string[]
): HistoricalAction => ({
  type: LOAD_REPORTS_ERROR,
  message,
});
