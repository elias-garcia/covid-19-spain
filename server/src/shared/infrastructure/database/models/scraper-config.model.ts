import { Schema, model } from "mongoose";

import { ScraperConfig } from "../interfaces/scraper-config.interface";
import { MongoDoc } from "../interfaces/mongo-doc.type";

export { ScraperConfigModel };

const scraperConfigSchema = new Schema<ScraperConfig>({
  nextReportIndex: {
    type: Schema.Types.Number,
    required: true
  }
});

const ScraperConfigModel = model<MongoDoc<ScraperConfig>>(
  "ScraperConfig",
  scraperConfigSchema
);
