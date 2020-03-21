import { AutonomousCommunity } from "../../../../shared/domain/autonomous-community.interface";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";

export { autonomousCommunityDocsToDtos };

function autonomousCommunityDocToDto(
  doc: MongoDoc<AutonomousCommunity>
): AutonomousCommunity {
  return {
    name: doc.name
  };
}

function autonomousCommunityDocsToDtos(
  docs: MongoDoc<AutonomousCommunity>[]
): AutonomousCommunity[] {
  return docs.map(autonomousCommunityDocToDto);
}
