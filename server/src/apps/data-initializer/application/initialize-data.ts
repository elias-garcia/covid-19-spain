import * as autonomousCommunitiesData from "../data/autonomous-communities.json";
import * as reportsData from "../data/reports.json";
import * as scraperConfigData from "../data/scraper-config.json";
import { scraperConfigValidationSchema } from "../../../shared/infrastructure/validation/schemas/scraper-config.validation-schema";
import {
  validateOne,
  validateMany
} from "../../../shared/infrastructure/validation";
import { reportValidationSchema } from "../../../shared/infrastructure/validation/schemas/report.validation-schema";
import { Report } from "../../../shared/domain/report.interface";
import { ReportModel } from "../../../shared/infrastructure/database/models/report.model";
import { ScraperConfig } from "../../../shared/domain/scraper-config.interface";
import { ScraperConfigModel } from "../../../shared/infrastructure/database/models/scraper-config.model";
import { AutonomousCommunity } from "../../../shared/domain/autonomous-community.interface";
import { autonomousCommunityValidationSchema } from "../../../shared/infrastructure/validation/schemas/autonomous-community.validation-schema";
import { AutonomousCommunityModel } from "../../../shared/infrastructure/database/models/autonomous-community.model";

export { initializeData };

async function initializeAutonomousCommunities(): Promise<void> {
  const validatedAutonomousCommunitiesData: AutonomousCommunity[] = validateMany(
    autonomousCommunitiesData,
    autonomousCommunityValidationSchema
  );
  await AutonomousCommunityModel.create(validatedAutonomousCommunitiesData);
}

async function initializeMetrics(): Promise<void> {
  const validatedReportsData: Report[] = validateMany(
    reportsData,
    reportValidationSchema
  );
  await ReportModel.create(validatedReportsData);
}

async function initializeScraperConfig(): Promise<void> {
  const validatedScraperConfigData: ScraperConfig = validateOne(
    scraperConfigData,
    scraperConfigValidationSchema
  );
  await ScraperConfigModel.create(validatedScraperConfigData);
}

async function initializeData(): Promise<void> {
  await initializeAutonomousCommunities();
  await initializeMetrics();
  await initializeScraperConfig();
}
