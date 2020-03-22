import * as reportsRepository from "../../infrastructure/database/reports.repository";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report } from "../../../../shared/domain/report.interface";
import { ReportsFilters } from "../../domain/reports-filters.interface";

export { getAllReports };

async function getAllReports(
  filters: ReportsFilters
): Promise<MongoDoc<Report>[]> {
  return reportsRepository.getAll(filters);
}
