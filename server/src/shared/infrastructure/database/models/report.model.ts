import { Schema, Model, model } from "mongoose";

import { Report, ReportData } from "../../../domain/report.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { ReportModel };

const isNullableFieldRequired = (value: unknown) =>
  value === null || typeof value === "number" || value instanceof Number;

const reportDataSchema = new Schema<ReportData>(
  {
    autonomousCommunity: {
      type: Schema.Types.String,
      required: true
    },
    values: {
      cases: {
        type: Schema.Types.Number,
        required: true
      },
      deaths: {
        type: Schema.Types.Number
      },
      hospitalized: {
        type: Schema.Types.Number
      },
      icu: {
        type: Schema.Types.Number
      },
      recovered: {
        type: Schema.Types.Number,
        required: isNullableFieldRequired
      }
    }
  },
  { _id: false }
);

const reportSchema = new Schema<Report>({
  timestamp: {
    type: Schema.Types.Date,
    required: true
  },
  data: [reportDataSchema]
});

const ReportModel: Model<MongoDoc<Report>> = model<MongoDoc<Report>>(
  "Report",
  reportSchema
);
