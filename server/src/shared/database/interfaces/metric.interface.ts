import { AutonomousCommunityData } from "../../../scraper/parsed-report.interface";

export interface Metric {
  readonly timestamp: Date;
  readonly data: AutonomousCommunityData[];
}
