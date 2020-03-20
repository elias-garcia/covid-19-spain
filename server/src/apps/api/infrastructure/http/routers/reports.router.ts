import { Router } from "express";

import * as reportsController from "../controllers/reports.controller";

export { reportsRouter };

const reportsRouter: Router = Router().get("/", reportsController.getAll);
