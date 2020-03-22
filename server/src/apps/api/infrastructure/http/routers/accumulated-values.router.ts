import { Router } from "express";

import * as accumulatedValuesController from "../controllers/accumulated-values.controller";

export { accumulatedValuesRouter };

const accumulatedValuesRouter: Router = Router().get(
  "/",
  accumulatedValuesController.getAll
);
