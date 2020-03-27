import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { ReportData } from "../../../../shared/domain/report.interface";

export { accumulatedValuesDocToDto };

function accumulatedValuesDocToDto(
  doc: MongoDoc<ReportData["values"]>
): ReportData["values"] {
  return {
    cases: doc.cases,
    deaths: doc.deaths,
    hospitalized: doc.hospitalized,
    icu: doc.icu,
    recovered: doc.recovered
  };
}
