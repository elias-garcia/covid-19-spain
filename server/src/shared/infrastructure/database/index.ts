import * as mongooose from "mongoose";

import { config } from "../config/config";
import { logger } from "../logging";

export { connect };

async function connect(): Promise<void> {
  logger.info(`[DB] Connecting to the database on: ${config.MONGO_URI}`);
  await mongooose.connect(config.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  logger.info(`[DB] Database connection established`);
}
