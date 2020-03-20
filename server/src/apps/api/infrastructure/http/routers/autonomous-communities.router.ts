import { Router } from "express";

import * as autonomousCommunitiesController from "../controllers/autonomous-communities.controller";

export { autonomousCommunitiesRouter };

const autonomousCommunitiesRouter: Router = Router().get(
  "/",
  autonomousCommunitiesController.getAll
);
