import { findScraperConfig } from "../shared/application/find-scraper-config";
import { UnexpectedNumberOfScraperConfigsFoundError } from "../shared/domain/unexpected-number-of-scraper-configs-found.error";
import { initializeData } from "./application/initialize-data";
import { logger } from "../shared/infrastructure/logging";

export { run };

async function run(): Promise<void> {
  try {
    await findScraperConfig();
    logger.info("Scraper config found. Skipping data initialization...");
  } catch (error) {
    if (
      error instanceof UnexpectedNumberOfScraperConfigsFoundError &&
      error.scraperConfigsFound === 0
    ) {
      logger.info("No scraper config found. Initializing data...");
      await initializeData();
    }

    return;
  }
}
