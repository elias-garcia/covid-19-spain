import * as express from "express";
import * as expressPino from "express-pino-logger";

import { config } from "../../shared/infrastructure/config/config";
import { logger } from "../../shared/infrastructure/logging";

export { bootstrap };

function bootstrap(): void {
  const app: express.Express = express();

  app.use(expressPino({ logger }));

  app.listen(config.API_PORT, () => {
    logger.info(`[API] Listening on port ${config.API_PORT}`);
  });
}
