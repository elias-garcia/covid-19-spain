import { ScraperConfig } from "../infrastructure/database/interfaces/scraper-config.interface";
import { MongoDoc } from "../infrastructure/database/interfaces/mongo-doc.type";
import { ScraperConfigModel } from "../infrastructure/database/models/scraper-config.model";
import { MoreThanOneScraperConfigFoundError } from "../domain/more-than-one-scraper-config-found.error";

export { findScraperConfig };

async function findScraperConfig(): Promise<MongoDoc<ScraperConfig>> {
  const docsFound = await ScraperConfigModel.find();

  if (docsFound.length !== 1) {
    throw new MoreThanOneScraperConfigFoundError(docsFound.length);
  }

  return docsFound[0];
}
