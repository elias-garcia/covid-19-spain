import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

import * as reportsApi from "../../../api/reports.api";
import * as autonomousCommunitiesApi from "../../../api/autonomous-communities.api";
import {
  HistoricalAction,
  LOAD_REPORTS,
  loadReportsSuccess,
  loadReportsError,
  LOAD_AUTONOMOUS_COMMUNITIES,
  loadAutonomousCommunitiesSuccess,
  loadAutonomousCommunitiesError,
  loadAutonomousCommunities,
  LOAD_DATA,
  loadReports,
} from "../historical/historical.actions";
import Report from "../../../domain/report.interface";

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
          return of(loadReportsError(error));
        })
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
          (autonomousCommunities: string[]) => {
            return loadAutonomousCommunitiesSuccess(autonomousCommunities);
          },
          catchError((error: string) => {
            return of(loadAutonomousCommunitiesError(error));
          })
        )
      );
    })
  );
};
