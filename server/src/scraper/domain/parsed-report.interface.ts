import { AutonomousCommunityData } from "../../shared/domain/autonomous-community-data.interface";

export { ParsedReport };

interface ParsedReport {
  readonly timestamp: string;
  readonly autonomousCommunitiesData: AutonomousCommunityData[];
}
