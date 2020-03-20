import { findScraperConfig } from "../../shared/application/find-scraper-config";
import { UnexpectedNumberOfScraperConfigsFoundError } from "../../shared/domain/unexpected-number-of-scraper-configs-found.error";
import { initializeData } from "./application/initialize-data";
import { logger } from "../../shared/infrastructure/logging";

export { checkAndRun };

async function shouldRun(): Promise<boolean> {
  try {
    await findScraperConfig();
    logger.info("[DATA-INITIALIZER] Scraper config found.");
    return false;
  } catch (error) {
    if (
      error instanceof UnexpectedNumberOfScraperConfigsFoundError &&
      error.scraperConfigsFound === 0
    ) {
      logger.info("[DATA-INITIALIZER] No scraper config found");
      return true;
    }
    throw error;
  }
}

async function checkAndRun(): Promise<void> {
  logger.info("[DATA-INITIALIZER] STARTED");
  if ((await shouldRun()) === true) {
    logger.info("[DATA-INITIALIZER] Initializing data...");
    await initializeData();
    logger.info("[DATA-INITIALIZER] Initializing data... OK");
  } else {
    logger.warn("[DATA-INITIALIZER] Skipping data initialization...");
  }
  logger.info("[DATA-INITIALIZER] FINISHED");
}
