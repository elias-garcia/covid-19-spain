import { Observable } from "rxjs";

import * as httpClient from "../utils/http-client";
import Report from "../domain/report.interface";
import { map } from "rxjs/operators";

interface FetchReportsParams {
  readonly sort: {
    readonly field: keyof Pick<Report, "timestamp">;
    readonly order: "asc" | "desc";
  };
  readonly limit: number;
}

const REPORTS_API_URL = `${process.env.REACT_APP_API_URL}/reports`;

const buildFetchReportsQueryString = ({
  sort,
  limit,
}: Partial<FetchReportsParams>): string => {
  const queryParams = new URLSearchParams();

  if (sort) {
    queryParams.append("sortField", sort.field);
    queryParams.append("sortOrder", sort.order);
  }
  if (limit) {
    queryParams.append("limit", limit.toFixed());
  }

  return queryParams.toString();
};

export const fetchLatestReport = (): Observable<Report> => {
  return fetchReports({
    sort: { field: "timestamp", order: "desc" },
    limit: 1,
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
