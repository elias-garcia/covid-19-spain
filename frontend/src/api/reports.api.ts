import { Observable } from "rxjs";

import * as httpClient from "../utils/http-client";
import Report from "../domain/report.interface";
import { map } from "rxjs/operators";

interface FetchReportsParams {
  readonly from: Date;
  readonly to: Date;
  readonly autonomousCommunities: string[];
}

const REPORTS_API_URL = `${process.env.REACT_APP_API_URL}/reports`;

const buildFetchReportsQueryString = ({
  from,
  to,
  autonomousCommunities,
}: Partial<FetchReportsParams>): string => {
  const queryParams = new URLSearchParams();

  if (from) {
    queryParams.append("from", from.toISOString());
  }
  if (to) {
    queryParams.append("to", to.toISOString());
  }
  if (autonomousCommunities) {
    queryParams.append(
      "autonomousCommunities",
      autonomousCommunities.join(",")
    );
  }

  return queryParams.toString();
};

export const fetchLatestReport = (): Observable<Report> => {
  const fromDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const toDate = new Date(new Date().setUTCHours(24, 0, 0, 0));

  return fetchReports({
    from: fromDate,
    to: toDate,
  }).pipe(map((reports) => reports[0]));
};

export const fetchReports = (
  params?: Partial<FetchReportsParams>
): Observable<Report[]> => {
  if (params && Object.keys(params).length) {
    const queryString = buildFetchReportsQueryString(params);

    return httpClient.get<Report[]>(`${REPORTS_API_URL}?${queryString}`);
  }

  return httpClient.get<Report[]>(REPORTS_API_URL);
};
