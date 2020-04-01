import Report, { Field } from "../../../domain/report.interface";
import AccumulatedValues from "../../../domain/accumulated-values.interface";

export const LOAD_DATA = "[DASHBOARD] LOAD DATA";
export const LOAD_LATEST_REPORT = "[DASHBOARD] LOAD LATEST REPORTS";
export const LOAD_LATEST_REPORT_SUCCESS =
  "[DASHBOARD] LOAD LATEST REPORT SUCCESS";
export const LOAD_LATEST_REPORT_ERROR = "[DASHBOARD] LOAD LATEST REPORT ERROR";
export const LOAD_ACCUMULATED_VALUES = "[DASHBOARD] LOAD ACCUMULATED VALUES";
export const LOAD_ACCUMULATED_VALUES_SUCCESS =
  "[DASHBOARD] LOAD ACCUMULATED VALUES SUCCESS";
export const LOAD_ACCUMULATED_VALUES_ERROR =
  "[DASHBOARD] LOAD ACCUMULATED VALUES ERROR";
export const CHANGE_CHOROPLETH_FILTER = "[DASHBOARD] CHANGE CHOROPLETH FILTER";

export interface LoadData {
  readonly type: typeof LOAD_DATA;
}

export interface LoadLatestReportAction {
  readonly type: typeof LOAD_LATEST_REPORT;
}

export interface LoadLatestReportSuccess {
  readonly type: typeof LOAD_LATEST_REPORT_SUCCESS;
  readonly report: Report;
}

export interface LoadLatestReportError {
  readonly type: typeof LOAD_LATEST_REPORT_ERROR;
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
  | LoadLatestReportAction
  | LoadLatestReportSuccess
  | LoadLatestReportError
  | LoadAccumulatedValuesAction
  | LoadAccumulatedValuesSuccess
  | LoadAccumulatedValuesError
  | ChangeChoroplethFilter;

export const loadData = (): DashboardAction => ({ type: LOAD_DATA });
export const loadLatestReport = (): DashboardAction => ({
  type: LOAD_LATEST_REPORT,
});
export const loadLatestReportSucces = (report: Report): DashboardAction => ({
  type: LOAD_LATEST_REPORT_SUCCESS,
  report,
});
export const loadLatestReportError = (
  message: string | string[]
): DashboardAction => ({
  type: LOAD_LATEST_REPORT_ERROR,
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
