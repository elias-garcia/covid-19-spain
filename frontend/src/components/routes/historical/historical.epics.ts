import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError, takeUntil } from "rxjs/operators";
import { of, Observable } from "rxjs";

import * as reportsApi from "../../../api/reports.api";
import * as autonomousCommunitiesApi from "../../../api/autonomous-communities.api";
import {
  HistoricalAction,
  LOAD_REPORTS,
  loadReportsSuccess,
  loadReportsFailure,
  LOAD_AUTONOMOUS_COMMUNITIES,
  loadAutonomousCommunitiesSuccess,
  loadAutonomousCommunitiesFailure,
  loadAutonomousCommunities,
  LOAD_DATA,
  loadReports,
  ABORT_DATA_LOADING,
} from "../historical/historical.actions";
import Report from "../../../domain/report.interface";
import { AutonomousCommunity } from "../../../domain/autonomous-community";

export const loadDataEpic = (
  action$: ActionsObservable<HistoricalAction>
): Observable<HistoricalAction> => {
  return action$.pipe(
    ofType(LOAD_DATA),
    mergeMap(() => {
      return of(loadReports(), loadAutonomousCommunities());
    })
  );
};

export const loadReportsEpic = (
  action$: ActionsObservable<HistoricalAction>
): Observable<HistoricalAction> => {
  return action$.pipe(
    ofType(LOAD_REPORTS),
    mergeMap(() => {
      return reportsApi.fetchReports().pipe(
        map((reports: Report[]) => loadReportsSuccess(reports)),
        catchError((error: string | string[]) => {
          return of(loadReportsFailure(error));
        }),
        takeUntil(action$.pipe(ofType(ABORT_DATA_LOADING)))
      );
    })
  );
};

export const loadAutonomousCommunitiesEpic = (
  action$: ActionsObservable<HistoricalAction>
): Observable<HistoricalAction> => {
  return action$.pipe(
    ofType(LOAD_AUTONOMOUS_COMMUNITIES),
    mergeMap(() => {
      return autonomousCommunitiesApi.fetchAutonomousCommunities().pipe(
        map(
          (autonomousCommunities: AutonomousCommunity[]) => {
            return loadAutonomousCommunitiesSuccess(autonomousCommunities);
          },
          catchError((error: string) => {
            return of(loadAutonomousCommunitiesFailure(error));
          })
        ),
        takeUntil(action$.pipe(ofType(ABORT_DATA_LOADING)))
      );
    })
  );
};
