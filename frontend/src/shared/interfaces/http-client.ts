import { Observable, throwError } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";

import { HttpOkResponse, HttpErrorResponse } from "./http-response";

export const get = <T>(url: string): Observable<T> => {
  return ajax.getJSON(url).pipe(
    map((response: unknown) => (response as HttpOkResponse<T>).data),
    catchError((error: unknown) => {
      const ajaxError = error as AjaxError;

      if ((ajaxError.request as HttpErrorResponse).message !== undefined) {
        return throwError((error as AjaxError).response);
      }

      return throwError(ajaxError.message);
    })
  );
};
