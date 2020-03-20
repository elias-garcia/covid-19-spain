import * as database from "./shared/infrastructure/database";
import * as dataInitializer from "./apps/data-initializer";
import * as scraper from "./apps/scraper";
import { logger } from "./shared/infrastructure/logging";
import { checkFirstRun } from "./shared/application/check-first-run";

async function main(): Promise<void> {
  try {
    await database.connect();

    const isFirstRrun: boolean = await checkFirstRun();

    logger.info(
      "[MAIN] Checking if the app is being ran for the first time..."
    );
    if (isFirstRrun) {
      logger.info(
        "[MAIN] Checking if the app is being ran for the first time... TRUE"
      );
      await dataInitializer.run();
      await scraper.runUntilGetUpToDate();
    } else {
      logger.info(
        "[MAIN] Checking if the app is being ran for the first time... FALSE"
      );
      logger.info("[MAIN] Skipping data-initialization");
    }
    scraper.scheduleRun();
  } catch (error) {
    logger.error(error);
  }
}

main();
