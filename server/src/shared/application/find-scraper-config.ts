import { ScraperConfig } from "../domain/scraper-config.interface";
import { MongoDoc } from "../infrastructure/database/interfaces/mongo-doc.type";
import { ScraperConfigModel } from "../infrastructure/database/models/scraper-config.model";
import { UnexpectedNumberOfScraperConfigsFoundError } from "../domain/unexpected-number-of-scraper-configs-found.error";

export { findScraperConfig };

async function findScraperConfig(): Promise<MongoDoc<ScraperConfig>> {
  const docsFound = await ScraperConfigModel.find();

  if (docsFound.length !== 1) {
    throw new UnexpectedNumberOfScraperConfigsFoundError(docsFound.length);
  }

  return docsFound[0];
}
