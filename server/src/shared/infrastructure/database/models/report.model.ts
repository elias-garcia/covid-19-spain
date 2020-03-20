import { Schema, Model, model } from "mongoose";

import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";
import { Report } from "../interfaces/report.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { ReportModel };

const reportDataSchema = new Schema<AutonomousCommunityData>(
  {
    autonomousCommunity: {
      type: Schema.Types.String,
      required: true
    },
    values: {
      casos: {
        type: Schema.Types.Number,
        required: true
      },
      fallecidos: {
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
