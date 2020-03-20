import * as cron from "node-cron";

import * as database from "./shared/infrastructure/database";
import * as dataInitializer from "./apps/data-initializer";
import * as scraper from "./apps/scraper";
import { logger } from "./shared/infrastructure/logging";

const SCRAPER_CRON_EXPRESSION = "0 * * * *";

async function main(): Promise<void> {
  try {
    await database.connect();
    await dataInitializer.run();
    cron.schedule(SCRAPER_CRON_EXPRESSION, scraper.run);
  } catch (error) {
    logger.error(error);
  }
}

main();
