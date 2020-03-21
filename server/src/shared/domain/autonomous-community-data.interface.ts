export { Field, AutonomousCommunityData };

type Field = "cases" | "deaths";

interface AutonomousCommunityData {
  readonly autonomousCommunity: string;
  readonly values: Record<Field, number>;
}
