import {
  AutonomousCommunityData,
  Field
} from "../../shared/domain/autonomous-community-data.interface";

export { ParsedReport };

interface ParsedReport {
  readonly timestamp: Date;
  readonly autonomousCommunitiesData: AutonomousCommunityData[];
  readonly aggregates: Record<Field, number>;
}
