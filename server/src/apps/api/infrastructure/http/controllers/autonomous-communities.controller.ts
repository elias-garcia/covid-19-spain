import { Request, Response, NextFunction } from "express";
import { getAllAutonomousCommunities } from "../../../application/autonomous-communities/get-all-autonomous-communities";
import { AutonomousCommunity } from "../../../../../shared/infrastructure/database/interfaces/autonomous-community.interface";
import { autonomousCommunityDocsToDtos } from "../../dtos/autonomous-community.dto-converter";
import { HttpOkResponse } from "../http-responses";

export { getAll };

async function getAll(
  _request: Request,
  response: Response<HttpOkResponse<AutonomousCommunity[]>>,
  next: NextFunction
): Promise<Response<HttpOkResponse<AutonomousCommunity[]>> | void> {
  try {
    const autonomousCommunitiesDocs = await getAllAutonomousCommunities();
    const autonomousCommunitiesDtos = autonomousCommunityDocsToDtos(
      autonomousCommunitiesDocs
    );

    return response.status(200).json({ data: autonomousCommunitiesDtos });
  } catch (error) {
    next(error);
  }
}
