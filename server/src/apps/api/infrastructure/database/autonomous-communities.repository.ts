import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AutonomousCommunity } from "../../../../shared/domain/autonomous-community.interface";
import { AutonomousCommunityModel } from "../../../../shared/infrastructure/database/models/autonomous-community.model";

export { getAll };

async function getAll(): Promise<MongoDoc<AutonomousCommunity>[]> {
  return AutonomousCommunityModel.find().exec();
}
