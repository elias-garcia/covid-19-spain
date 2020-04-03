import { Report } from "../../../shared/domain/report.interface";

export { ReportsFilters };

interface ReportsFilters {
  readonly autonomousCommunities?: string[];
  readonly from?: Date;
  readonly to?: Date;
  readonly sortField?: keyof Pick<Report, "timestamp">;
  readonly sortOrder?: "asc" | "desc";
  readonly limit?: number;
}
