import { initializeData } from "./application/initialize-data";
import { logger } from "../../shared/infrastructure/logging";

export { run };

async function run(): Promise<void> {
  logger.info("[DATA-INITIALIZER] STARTED");
  logger.info("[DATA-INITIALIZER] Initializing data...");
  await initializeData();
  logger.info("[DATA-INITIALIZER] Initializing data... OK");
  logger.info("[DATA-INITIALIZER] FINISHED");
}
