import { Schema, model } from "mongoose";

import { MongoDoc } from "../interfaces/mongo-doc.type";
import { AutonomousCommunity } from "../interfaces/autonomous-community.interface";

export { AutonomousCommunityModel };

const autonomousCommunitySchema = new Schema<AutonomousCommunity>({
  name: {
    type: Schema.Types.String,
    required: true
  }
});

const AutonomousCommunityModel = model<MongoDoc<AutonomousCommunity>>(
  "Autonomous-Community",
  autonomousCommunitySchema
);
