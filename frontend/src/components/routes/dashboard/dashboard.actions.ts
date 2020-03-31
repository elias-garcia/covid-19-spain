import Report, { Field } from "../../../domain/report.interface";
import AccumulatedValues from "../../../domain/accumulated-values.interface";

export const LOAD_DATA = "[DASHBOARD] LOAD DATA";
export const LOAD_REPORTS = "[DASHBOARD] LOAD REPORTS";
export const LOAD_REPORTS_SUCCESS = "[DASHBOARD] LOAD REPORTS SUCCESS";
export const LOAD_REPORTS_ERROR = "[DASHBOARD] LOAD REPORTS ERROR";
export const LOAD_ACCUMULATED_VALUES = "[DASHBOARD] LOAD ACCUMULATED VALUES";
export const LOAD_ACCUMULATED_VALUES_SUCCESS =
  "[DASHBOARD] LOAD ACCUMULATED VALUES SUCCESS";
export const LOAD_ACCUMULATED_VALUES_ERROR =
  "[DASHBOARD] LOAD ACCUMULATED VALUES ERROR";
export const CHANGE_CHOROPLETH_FILTER = "[DASHBOARD] CHANGE CHOROPLETH FILTER";

export interface LoadData {
  readonly type: typeof LOAD_DATA;
}

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

export interface LoadAccumulatedValuesAction {
  readonly type: typeof LOAD_ACCUMULATED_VALUES;
}

export interface LoadAccumulatedValuesSuccess {
  readonly type: typeof LOAD_ACCUMULATED_VALUES_SUCCESS;
  readonly accumulatedValues: AccumulatedValues;
}

export interface LoadAccumulatedValuesError {
  readonly type: typeof LOAD_ACCUMULATED_VALUES_ERROR;
  readonly message: string | string[];
}

export interface ChangeChoroplethFilter {
  readonly type: typeof CHANGE_CHOROPLETH_FILTER;
  readonly newValue: Field;
}

export type DashboardAction =
  | LoadData
  | LoadReportsAction
  | LoadReportsSuccess
  | LoadReportsError
  | LoadAccumulatedValuesAction
  | LoadAccumulatedValuesSuccess
  | LoadAccumulatedValuesError
  | ChangeChoroplethFilter;

export const loadData = (): DashboardAction => ({ type: LOAD_DATA });
export const loadReports = (): DashboardAction => ({ type: LOAD_REPORTS });
export const loadReportsSuccess = (reports: Report[]): DashboardAction => ({
  type: LOAD_REPORTS_SUCCESS,
  reports,
});
export const loadReportsError = (
  message: string | string[]
): DashboardAction => ({
  type: LOAD_REPORTS_ERROR,
  message,
});
export const loadAccumulatedValues = (): DashboardAction => ({
  type: LOAD_ACCUMULATED_VALUES,
});
export const loadAccumulatedValuesSuccess = (
  accumulatedValues: AccumulatedValues
): DashboardAction => ({
  type: LOAD_ACCUMULATED_VALUES_SUCCESS,
  accumulatedValues,
});
export const loadAccumulatedValuesError = (
  message: string | string[]
): DashboardAction => ({
  type: LOAD_ACCUMULATED_VALUES_ERROR,
  message,
});
export const changeChoroplethFilter = (newValue: Field): DashboardAction => ({
  type: CHANGE_CHOROPLETH_FILTER,
  newValue,
});
