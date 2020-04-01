import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

import {
  DashboardAction,
  LOAD_LATEST_REPORT,
  loadLatestReportSucces,
  loadLatestReportError,
  LOAD_DATA,
  loadLatestReport,
  loadAccumulatedValues,
  LOAD_ACCUMULATED_VALUES,
  loadAccumulatedValuesSuccess,
  loadAccumulatedValuesError,
} from "./dashboard.actions";
import * as reportsApi from "../../../api/reports.api";
import * as accumulatedValuesApi from "../../../api/accumulated-values.api";
import Report from "../../../domain/report.interface";
import AccumulatedValues from "../../../domain/accumulated-values.interface";

export const loadDataEpic = (
  action$: ActionsObservable<DashboardAction>
): Observable<DashboardAction> => {
  return action$.pipe(
    ofType(LOAD_DATA),
    mergeMap(() => {
      return of(loadLatestReport(), loadAccumulatedValues());
    })
  );
};

export const loadLatestReportEpic = (
  action$: ActionsObservable<DashboardAction>
): Observable<DashboardAction> => {
  return action$.pipe(
    ofType(LOAD_LATEST_REPORT),
    mergeMap(() => {
      return reportsApi.fetchLatestReport().pipe(
        map((report: Report) => loadLatestReportSucces(report)),
        catchError((error: string | string[]) => {
          return of(loadLatestReportError(error));
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
