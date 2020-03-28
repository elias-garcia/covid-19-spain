export { Report, ReportData };

type Field = "cases" | "deaths" | "hospitalized" | "icu" | "recovered";

interface ReportData {
  readonly autonomousCommunity: string;
  readonly values: {
    [key in Field]: key extends "cases" | "deaths" ? number : number | null;
  };
}

interface Report {
  readonly timestamp: Date;
  readonly data: ReportData[];
}
