import Report from "../../../domain/report.interface";

export const LOAD_DATA = "[HISTORICAL] LOAD DATA";
export const LOAD_REPORTS = "[HISTORICAL] LOAD REPORTS";
export const LOAD_REPORTS_SUCCESS = "[HISTORICAL] LOAD REPORTS SUCCESS";
export const LOAD_REPORTS_FAILURE = "[HISTORICAL] LOAD REPORTS FAILURE";
export const LOAD_AUTONOMOUS_COMMUNITIES =
  "[HISTORICAL] LOAD AUTONOMOUS COMMUNITIES";
export const LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS =
  "[HISTORICAL] LOAD AUTONOMOUS COMMUNITIES SUCCESS";
export const LOAD_AUTONOMOUS_COMMUNITIES_FAILURE =
  "[HISTORICAL] LOAD AUTONOMOUS FAILURE";

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

export interface LoadReportsFailure {
  readonly type: typeof LOAD_REPORTS_FAILURE;
  readonly message: string | string[];
}

export interface LoadAutonomousCommunities {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES;
}

export interface LoadAutonomousCommunitiesSuccess {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS;
  readonly autonomousCommunities: string[];
}

export interface LoadAutonomousCommunitiesFailure {
  readonly type: typeof LOAD_AUTONOMOUS_COMMUNITIES_FAILURE;
  readonly message: string;
}

export type HistoricalAction =
  | LoadData
  | LoadReportsAction
  | LoadReportsSuccess
  | LoadReportsFailure
  | LoadAutonomousCommunities
  | LoadAutonomousCommunitiesSuccess
  | LoadAutonomousCommunitiesFailure;

export const loadData = (): HistoricalAction => ({ type: LOAD_DATA });
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
  autonomousCommunities: string[]
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
