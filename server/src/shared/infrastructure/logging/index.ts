import * as pino from "pino";
import { config } from "../config/config";

export { logger };

const logger = pino({
  prettyPrint: config.NODE_ENV === "development"
});
