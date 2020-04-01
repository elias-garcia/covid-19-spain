import Report, { Field } from "../../../domain/report.interface";
import AccumulatedValues from "../../../domain/accumulated-values.interface";

export const LOAD_DATA = "[DASHBOARD] LOAD DATA";
export const ABORT_DATA_LOADING = "[DASHBOARD] ABORT DATA LOADING";
export const LOAD_LATEST_REPORT = "[DASHBOARD] LOAD LATEST REPORTS";
export const LOAD_LATEST_REPORT_SUCCESS =
  "[DASHBOARD] LOAD LATEST REPORT SUCCESS";
export const LOAD_LATEST_REPORT_FAILURE =
  "[DASHBOARD] LOAD LATEST REPORT FAILURE";
export const LOAD_ACCUMULATED_VALUES = "[DASHBOARD] LOAD ACCUMULATED VALUES";
export const LOAD_ACCUMULATED_VALUES_SUCCESS =
  "[DASHBOARD] LOAD ACCUMULATED VALUES SUCCESS";
export const LOAD_ACCUMULATED_VALUES_FAILURE =
  "[DASHBOARD] LOAD ACCUMULATED VALUES FAILURE";
export const CHANGE_CHOROPLETH_FILTER = "[DASHBOARD] CHANGE CHOROPLETH FILTER";

export interface LoadData {
  readonly type: typeof LOAD_DATA;
}

export interface AbortDataLoading {
  readonly type: typeof ABORT_DATA_LOADING;
}

export interface LoadLatestReportAction {
  readonly type: typeof LOAD_LATEST_REPORT;
}

export interface LoadLatestReportSuccess {
  readonly type: typeof LOAD_LATEST_REPORT_SUCCESS;
  readonly report: Report;
}

export interface LoadLatestReportFailure {
  readonly type: typeof LOAD_LATEST_REPORT_FAILURE;
  readonly message: string | string[];
}

export interface LoadAccumulatedValuesAction {
  readonly type: typeof LOAD_ACCUMULATED_VALUES;
}

export interface LoadAccumulatedValuesSuccess {
  readonly type: typeof LOAD_ACCUMULATED_VALUES_SUCCESS;
  readonly accumulatedValues: AccumulatedValues;
}

export interface LoadAccumulatedValuesFailure {
  readonly type: typeof LOAD_ACCUMULATED_VALUES_FAILURE;
  readonly message: string | string[];
}

export interface ChangeChoroplethFilter {
  readonly type: typeof CHANGE_CHOROPLETH_FILTER;
  readonly newValue: Field;
}

export type DashboardAction =
  | LoadData
  | AbortDataLoading
  | LoadLatestReportAction
  | LoadLatestReportSuccess
  | LoadLatestReportFailure
  | LoadAccumulatedValuesAction
  | LoadAccumulatedValuesSuccess
  | LoadAccumulatedValuesFailure
  | ChangeChoroplethFilter;

export const loadData = (): DashboardAction => ({ type: LOAD_DATA });
export const abortDataLoading = (): DashboardAction => ({
  type: ABORT_DATA_LOADING,
});
export const loadLatestReport = (): DashboardAction => ({
  type: LOAD_LATEST_REPORT,
});
export const loadLatestReportSucces = (report: Report): DashboardAction => ({
  type: LOAD_LATEST_REPORT_SUCCESS,
  report,
});
export const loadLatestReportFailure = (
  message: string | string[]
): DashboardAction => ({
  type: LOAD_LATEST_REPORT_FAILURE,
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
export const loadAccumulatedValuesFailure = (
  message: string | string[]
): DashboardAction => ({
  type: LOAD_ACCUMULATED_VALUES_FAILURE,
  message,
});
export const changeChoroplethFilter = (newValue: Field): DashboardAction => ({
  type: CHANGE_CHOROPLETH_FILTER,
  newValue,
});
