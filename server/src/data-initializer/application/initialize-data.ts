import * as autonomousCommunitiesData from "../data/autonomous-communities.json";
import * as metricsData from "../data/metrics.json";
import * as scraperConfigData from "../data/scraper-config.json";
import { scraperConfigValidationSchema } from "../../shared/infrastructure/validation/schemas/scraper-config.validation-schema";
import {
  validateOne,
  validateMany
} from "../../shared/infrastructure/validation";
import { metricValidationSchema } from "../../shared/infrastructure/validation/schemas/metric.validation-schema";
import { Metric } from "../../shared/infrastructure/database/interfaces/metric.interface";
import { MetricModel } from "../../shared/infrastructure/database/models/metric.model";
import { ScraperConfig } from "../../shared/infrastructure/database/interfaces/scraper-config.interface";
import { ScraperConfigModel } from "../../shared/infrastructure/database/models/scraper-config.model";
import { AutonomousCommunity } from "../../shared/infrastructure/database/interfaces/autonomous-community.interface";
import { autonomousCommunityValidationSchema } from "../../shared/infrastructure/validation/schemas/autonomous-community.validation-schema";
import { AutonomousCommunityModel } from "../../shared/infrastructure/database/models/autonomous-community.model";

export { initializeData };

async function initializeAutonomousCommunities(): Promise<void> {
  const validatedAutonomousCommunitiesData: AutonomousCommunity[] = validateMany(
    autonomousCommunitiesData,
    autonomousCommunityValidationSchema
  );
  await AutonomousCommunityModel.create(validatedAutonomousCommunitiesData);
}

async function initializeMetrics(): Promise<void> {
  const validatedMetricsData: Metric[] = validateMany(
    metricsData,
    metricValidationSchema
  );
  await MetricModel.create(validatedMetricsData);
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
