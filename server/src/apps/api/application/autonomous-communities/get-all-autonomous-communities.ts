import { AutonomousCommunityModel } from "../../../../shared/infrastructure/database/models/autonomous-community.model";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AutonomousCommunity } from "../../../../shared/domain/autonomous-community.interface";

export { getAllAutonomousCommunities };

async function getAllAutonomousCommunities(): Promise<
  MongoDoc<AutonomousCommunity>[]
> {
  return AutonomousCommunityModel.find().exec();
}
