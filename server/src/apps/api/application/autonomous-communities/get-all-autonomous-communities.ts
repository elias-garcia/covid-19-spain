import * as autonomousCommunitiesRepository from "../../infrastructure/database/autonomous-communities.repository";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AutonomousCommunity } from "../../../../shared/domain/autonomous-community.interface";

export { getAllAutonomousCommunities };

async function getAllAutonomousCommunities(): Promise<
  MongoDoc<AutonomousCommunity>[]
> {
  return autonomousCommunitiesRepository.getAll();
}
