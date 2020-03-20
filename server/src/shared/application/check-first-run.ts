import { findScraperConfig } from "./find-scraper-config";
import { UnexpectedNumberOfScraperConfigsFoundError } from "../domain/unexpected-number-of-scraper-configs-found.error";

export { checkFirstRun };

async function checkFirstRun(): Promise<boolean> {
  try {
    await findScraperConfig();

    return false;
  } catch (error) {
    if (
      error instanceof UnexpectedNumberOfScraperConfigsFoundError &&
      error.scraperConfigsFound === 0
    ) {
      return true;
    }
    throw error;
  }
}
