import { Observable } from "rxjs";

import * as httpClient from "../interfaces/http-client";
import Report from "../domain/report.interface";

const REPORTS_API_URL = `${process.env.REACT_APP_API_URL}/reports`;

export const fetchReports = (): Observable<Report[]> => {
  return httpClient.get<Report[]>(REPORTS_API_URL);
};
