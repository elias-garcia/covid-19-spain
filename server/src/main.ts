import * as database from "./shared/database";
import * as scraper from "./scraper";

async function main(): Promise<void> {
  try {
    await database.connect();
    await scraper.run();
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
}

main();
