import { Schema, Model, model } from "mongoose";

import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";
import { Metric } from "../interfaces/metric.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { MetricModel };

const metricDataSchema = new Schema<AutonomousCommunityData>(
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

const metricSchema = new Schema<Metric>({
  timestamp: {
    type: Schema.Types.Date,
    required: true
  },
  data: [metricDataSchema]
});

const MetricModel: Model<MongoDoc<Metric>> = model<MongoDoc<Metric>>(
  "Metric",
  metricSchema
);
