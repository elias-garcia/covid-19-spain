export { Field, AutonomousCommunityData, ParsedReport };

type Field = "casos" | "fallecidos";

interface AutonomousCommunityData {
  readonly autonomousCommunity: string;
  readonly values: Record<Field, number>;
}

interface ParsedReport {
  readonly timestamp: Date;
  readonly autonomousCommunitiesData: AutonomousCommunityData[];
  readonly aggregates: Record<Field, number>;
}
