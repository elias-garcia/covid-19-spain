import { Schema, Model, model } from "mongoose";

import { Metric } from "../interfaces/metric.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { MetricModel };

const metricSchema = new Schema<Metric>({
  timestamp: {
    type: Schema.Types.Date,
    required: true
  },
  data: [
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
    }
  ]
});

const MetricModel: Model<MongoDoc<Metric>> = model<MongoDoc<Metric>>(
  "Metric",
  metricSchema
);
