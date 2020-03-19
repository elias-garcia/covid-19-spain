import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";

export interface Metric {
  readonly timestamp: Date;
  readonly data: AutonomousCommunityData[];
}
