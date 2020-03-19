import * as scraperConfigData from "../data/scraper-config.json";
import * as metricsData from "../data/metrics.json";
import { scraperConfigValidationSchema } from "../../shared/infrastructure/validation/schemas/scraper-config.validation-schema";
import {
  validateOne,
  validateMany
} from "../../shared/infrastructure/validation";
import { logger } from "../../shared/infrastructure/logging";
import { metricValidationSchema } from "../../shared/infrastructure/validation/schemas/metric.validation-schema";
import { Metric } from "../../shared/infrastructure/database/interfaces/metric.interface";
import { MetricModel } from "../../shared/infrastructure/database/models/metric.model";
import { ScraperConfig } from "../../shared/infrastructure/database/interfaces/scraper-config.interface";
import { ScraperConfigModel } from "../../shared/infrastructure/database/models/scraper-config.model";

export { initializeData };

async function initializeMetrics(): Promise<void> {
  logger.info("Initializing Metrics data...");
  const validatedMetricsData: Metric[] = validateMany(
    metricsData,
    metricValidationSchema
  );
  await MetricModel.create(validatedMetricsData);
  logger.info("Metrics data initialized...");
}

async function initializeScraperConfig(): Promise<void> {
  logger.info("Initializing Scraper Config data...");
  const validatedScraperConfigData: ScraperConfig = validateOne(
    scraperConfigData,
    scraperConfigValidationSchema
  );
  await ScraperConfigModel.create(validatedScraperConfigData);
  logger.info("Scraper Config data initialized...");
}

async function initializeData(): Promise<void> {
  await initializeMetrics();
  await initializeScraperConfig();
}
