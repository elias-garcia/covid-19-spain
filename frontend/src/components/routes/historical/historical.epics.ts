import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

import * as reportsApi from "../../../api/reports.api";
import {
  HistoricalAction,
  LOAD_REPORTS,
  loadReportsSuccess,
  loadReportsError,
} from "../historical/historical.actions";
import Report from "../../../domain/report.interface";

export const loadReportsEpic = (
  action$: ActionsObservable<HistoricalAction>
): Observable<HistoricalAction> => {
  return action$.pipe(
    ofType(LOAD_REPORTS),
    mergeMap(() => {
      return reportsApi.fetchReports({}).pipe(
        map((reports: Report[]) => loadReportsSuccess(reports)),
        catchError((error: string | string[]) => {
          return of(loadReportsError(error));
        })
      );
    })
  );
};
