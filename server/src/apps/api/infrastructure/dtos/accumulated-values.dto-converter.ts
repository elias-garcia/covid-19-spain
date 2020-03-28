import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AccumulatedValues } from "../../../../shared/domain/accumulated-values.interface";

export { accumulatedValuesDocToDto };

function accumulatedValuesDocToDto(
  doc: MongoDoc<AccumulatedValues>
): AccumulatedValues {
  return {
    cases: doc.cases,
    deaths: doc.deaths,
    hospitalized: doc.hospitalized,
    icu: doc.icu,
    recovered: doc.recovered
  };
}
