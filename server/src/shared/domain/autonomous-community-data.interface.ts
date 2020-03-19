export { Field, AutonomousCommunityData };

type Field = "casos" | "fallecidos";

interface AutonomousCommunityData {
  readonly autonomousCommunity: string;
  readonly values: Record<Field, number>;
}
