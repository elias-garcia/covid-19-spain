import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { AutonomousCommunity } from "../../../../shared/domain/autonomous-community.interface";
import { AutonomousCommunityModel } from "../../../../shared/infrastructure/database/models/autonomous-community.model";

export { getAll };

const SORT_ORDER: Partial<Record<keyof AutonomousCommunity, 1 | -1>> = {
  name: 1
};

async function getAll(): Promise<MongoDoc<AutonomousCommunity>[]> {
  return AutonomousCommunityModel.find()
    .sort(SORT_ORDER)
    .exec();
}
