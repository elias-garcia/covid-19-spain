import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report } from "../../../../shared/infrastructure/database/interfaces/report.interface";
import { ReportModel } from "../../../../shared/infrastructure/database/models/report.model";

export { getAllReports };

async function getAllReports(): Promise<MongoDoc<Report>[]> {
  return ReportModel.find().exec();
}
