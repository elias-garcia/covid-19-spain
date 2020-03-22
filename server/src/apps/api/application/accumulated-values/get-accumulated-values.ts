import * as reportsRepository from "../../infrastructure/database/reports.repository";
import { ReportData } from "../../../../shared/domain/report.interface";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";

export { getAccumulatedValues };

async function getAccumulatedValues(): Promise<MongoDoc<ReportData["values"]>> {
  return reportsRepository.getAccumulatedValues();
}
