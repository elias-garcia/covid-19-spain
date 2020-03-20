import { findScraperConfig } from "../../shared/application/find-scraper-config";
import { UnexpectedNumberOfScraperConfigsFoundError } from "../../shared/domain/unexpected-number-of-scraper-configs-found.error";
import { initializeData } from "./application/initialize-data";
import { logger } from "../../shared/infrastructure/logging";

export { run };

async function run(): Promise<void> {
  logger.info("[DATA-INITIALIZER] STARTED");
  try {
    await findScraperConfig();
    logger.info(
      "[DATA-INITIALIZER] Scraper config found. Skipping data initialization..."
    );
  } catch (error) {
    if (
      error instanceof UnexpectedNumberOfScraperConfigsFoundError &&
      error.scraperConfigsFound === 0
    ) {
      logger.info(
        "[DATA-INITIALIZER] No scraper config found. Initializing data..."
      );
      await initializeData();
      logger.info("[DATA-INITIALIZER] Data initialized successfully");
    }
  } finally {
    logger.info("[DATA-INITIALIZER] FINISHED");
  }
}
