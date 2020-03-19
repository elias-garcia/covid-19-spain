export { Field, AutonomousCommunityData, ParsedReport };

type Field = "casos" | "ia" | "uci" | "fallecidos";

interface AutonomousCommunityData {
  readonly name: string;
  readonly values: Partial<Record<Field, number>>;
}

interface ParsedReport {
  readonly date: Date;
  readonly autonomousCommunitiesData: AutonomousCommunityData[];
  readonly aggregates: Partial<Record<Field, number>>;
}
