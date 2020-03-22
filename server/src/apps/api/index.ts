import * as express from "express";
import * as expressPino from "express-pino-logger";

import { config } from "../../shared/infrastructure/config/config";
import { logger } from "../../shared/infrastructure/logging";
import { clientErrorHandler } from "./infrastructure/error-handling/client.error-handler";
import { unexpectedErrorHandler } from "./infrastructure/error-handling/unexpected.error-handler";
import { autonomousCommunitiesRouter } from "./infrastructure/http/routers/autonomous-communities.router";
import { reportsRouter } from "./infrastructure/http/routers/reports.router";
import { accumulatedValuesRouter } from "./infrastructure/http/routers/accumulated-values.router";

export { bootstrap };

function bootstrap(): void {
  const app: express.Express = express();

  app.use(expressPino({ logger }));

  app.use("/autonomous-communities", autonomousCommunitiesRouter);
  app.use("/reports", reportsRouter);
  app.use("/accumulated-values", accumulatedValuesRouter);

  app.use(clientErrorHandler);
  app.use(unexpectedErrorHandler);

  app.listen(config.API_PORT, () => {
    logger.info(`[API] Listening on port ${config.API_PORT}`);
  });
}
