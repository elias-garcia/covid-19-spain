import * as database from "./shared/infrastructure/database";
import * as dataInitializer from "./apps/data-initializer";
import * as scraper from "./apps/scraper";
import { logger } from "./shared/infrastructure/logging";

async function main(): Promise<void> {
  try {
    await database.connect();
    await dataInitializer.run();
    await scraper.run();
  } catch (error) {
    logger.error(error);
  }
}

main();
