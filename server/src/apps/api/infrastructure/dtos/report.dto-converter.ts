import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report } from "../../../../shared/domain/report.interface";

export { reportDocsToDtos };

function reportDocToDto(doc: MongoDoc<Report>): Report {
  return {
    timestamp: doc.timestamp,
    data: doc.data
  };
}

function reportDocsToDtos(docs: MongoDoc<Report>[]): Report[] {
  return docs.map(reportDocToDto);
}
