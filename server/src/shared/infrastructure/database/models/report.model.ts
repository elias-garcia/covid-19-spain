import { Schema, Model, model } from "mongoose";

import { Report, ReportData } from "../../../domain/report.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { ReportModel };

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
        type: Schema.Types.Number,
        required: true
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
