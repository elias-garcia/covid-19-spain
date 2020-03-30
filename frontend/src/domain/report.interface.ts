export type Field = "cases" | "deaths" | "hospitalized" | "icu" | "recovered";

export interface ReportData {
  readonly autonomousCommunity: string;
  readonly values: Record<Field, number | null>;
}

interface Report {
  readonly timestamp: string;
  readonly data: ReportData[];
}

export default Report;
