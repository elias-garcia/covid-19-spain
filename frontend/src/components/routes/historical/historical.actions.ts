import Report from "../../../domain/report.interface";
import { AutonomousCommunity } from "../../../domain/autonomous-community";

export const LOAD_DATA = "[HISTORICAL] LOAD DATA";
export const ABORT_DATA_LOADING = "[DASHBOARD] ABORT DATA LOADING";
export const LOAD_REPORTS = "[HISTORICAL] LOAD REPORTS";
export const LOAD_REPORTS_SUCCESS = "[HISTORICAL] LOAD REPORTS SUCCESS";
export const LOAD_REPORTS_FAILURE = "[HISTORICAL] LOAD REPORTS FAILURE";
export const LOAD_AUTONOMOUS_COMMUNITIES =
  "[HISTORICAL] LOAD AUTONOMOUS COMMUNITIES";
export const LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS =
  "[HISTORICAL] LOAD AUTONOMOUS COMMUNITIES SUCCESS";
export const LOAD_AUTONOMOUS_COMMUNITIES_FAILURE =
  "[HISTORICAL] LOAD AUTONOMOUS FAILURE";
export const UPDATE_SELECTED_AUTONOMOUS_COMMUNITIES =
  "[HISTORICAL] UPDATE SELECTED AUTONOMOUS COMMUNITIES";

export interface LoadData {
  readonly type: typeof LOAD_DATA;
}

export interface AbortDataLoading {
  readonly type: typeof ABORT_DATA_LOADING;
}

export interface LoadReportsAction {
  readonly type: typeof LOAD_REPORTS;
}

export interface LoadReportsSuccess {
  readonly type: typeof LOAD_REPORTS_SUCCESS;
  readonly reports: Report[];
}

export interface LoadReportsFailure {
  readonly type: typeof LOAD_REPORTS_FAILURE;
  readonly message: string | string[];
}

export interface LoadAutonomousCommunities {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES;
}

export interface LoadAutonomousCommunitiesSuccess {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS;
  readonly autonomousCommunities: AutonomousCommunity[];
}

export interface LoadAutonomousCommunitiesFailure {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES_FAILURE;
  readonly message: string;
}

export interface UpdateSelectedAutonomousCommunities {
  readonly type: typeof UPDATE_SELECTED_AUTONOMOUS_COMMUNITIES;
  readonly autonomousCommunities: string[];
}

export type HistoricalAction =
  | LoadData
  | AbortDataLoading
  | LoadReportsAction
  | LoadReportsSuccess
  | LoadReportsFailure
  | LoadAutonomousCommunities
  | LoadAutonomousCommunitiesSuccess
  | LoadAutonomousCommunitiesFailure
  | UpdateSelectedAutonomousCommunities;

export const loadData = (): HistoricalAction => ({ type: LOAD_DATA });
export const abortDataLoading = (): HistoricalAction => ({
  type: ABORT_DATA_LOADING,
});
export const loadReports = (): HistoricalAction => ({ type: LOAD_REPORTS });
export const loadReportsSuccess = (reports: Report[]): HistoricalAction => ({
  type: LOAD_REPORTS_SUCCESS,
  reports,
});
export const loadReportsFailure = (
  message: string | string[]
): HistoricalAction => ({
  type: LOAD_REPORTS_FAILURE,
  message,
});
export const loadAutonomousCommunities = (): HistoricalAction => ({
  type: LOAD_AUTONOMOUS_COMMUNITIES,
});
export const loadAutonomousCommunitiesSuccess = (
  autonomousCommunities: AutonomousCommunity[]
): HistoricalAction => ({
  type: LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS,
  autonomousCommunities,
});
export const loadAutonomousCommunitiesFailure = (
  message: string
): HistoricalAction => ({
  type: LOAD_AUTONOMOUS_COMMUNITIES_FAILURE,
  message,
});
export const updateSelectedAutonomousCommunities = (
  autonomousCommunities: string[]
): HistoricalAction => ({
  type: UPDATE_SELECTED_AUTONOMOUS_COMMUNITIES,
  autonomousCommunities,
});
