import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

import {
  DashboardAction,
  LOAD_REPORTS,
  loadReportsSuccess,
  loadReportsError,
  LOAD_DATA,
  loadReports,
  loadAccumulatedValues,
  LOAD_ACCUMULATED_VALUES,
  loadAccumulatedValuesSuccess,
  loadAccumulatedValuesError,
} from "./dashboard.actions";
import * as reportsApi from "../../../../shared/apis/reports.api";
import * as accumulatedValuesApi from "../../../../shared/apis/accumulated-values.api";
import Report from "../../../../shared/domain/report.interface";
import AccumulatedValues from "../../../../shared/domain/accumulated-values.interface";

export const loadDataEpic = (
  action$: ActionsObservable<DashboardAction>
): Observable<DashboardAction> => {
  return action$.pipe(
    ofType(LOAD_DATA),
    mergeMap(() => {
      return of(loadReports(), loadAccumulatedValues());
    })
  );
};

export const loadReportsEpic = (
  action$: ActionsObservable<DashboardAction>
): Observable<DashboardAction> => {
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

export const loadAccumulatedValuesEpic = (
  action$: ActionsObservable<DashboardAction>
): Observable<DashboardAction> => {
  return action$.pipe(
    ofType(LOAD_ACCUMULATED_VALUES),
    mergeMap(() => {
      return accumulatedValuesApi.fetchAccumulatedValues().pipe(
        map((accumulatedValues: AccumulatedValues) =>
          loadAccumulatedValuesSuccess(accumulatedValues)
        ),
        catchError((error: string | string[]) =>
          of(loadAccumulatedValuesError(error))
        )
      );
    })
  );
};
