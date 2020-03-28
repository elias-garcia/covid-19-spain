import * as reportsRepository from "../../infrastructure/database/reports.repository";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AccumulatedValues } from "../../../../shared/domain/accumulated-values.interface";

export { getAccumulatedValues };

async function getAccumulatedValues(): Promise<MongoDoc<AccumulatedValues>> {
  return reportsRepository.getAccumulatedValues();
}
