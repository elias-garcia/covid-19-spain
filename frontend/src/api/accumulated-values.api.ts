import { Observable } from "rxjs";

import * as httpClient from "../utils/http-client";
import AccumulatedValues from "../domain/accumulated-values.interface";

const ACCUMULATED_VALUES_API_URL = `${process.env.REACT_APP_API_URL}/accumulated-values`;

export const fetchAccumulatedValues = (): Observable<AccumulatedValues> => {
  return httpClient.get<AccumulatedValues>(ACCUMULATED_VALUES_API_URL);
};
