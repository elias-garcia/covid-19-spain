export { Report, ReportData };

type Field = "cases" | "deaths";

interface ReportData {
  readonly autonomousCommunity: string;
  readonly values: Record<Field, number>;
}

interface Report {
  readonly timestamp: Date;
  readonly data: ReportData[];
}
