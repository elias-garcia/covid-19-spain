import * as pdfParse from "pdf-parse";

import { ParsedReport } from "./domain/parsed-report.interface";
import { parseReport } from "./application/parse-report";
import { findScraperConfig } from "../shared/application/find-scraper-config";
import { MongoDoc } from "../shared/infrastructure/database/interfaces/mongo-doc.type";
import { ScraperConfig } from "../shared/infrastructure/database/interfaces/scraper-config.interface";
import { getPdfReport } from "./application/get-pdf-report";
import { logger } from "../shared/infrastructure/logging";
import { Metric } from "../shared/infrastructure/database/interfaces/metric.interface";
import { MetricModel } from "../shared/infrastructure/database/models/metric.model";
import { metricValidationSchema } from "../shared/infrastructure/validation/schemas/metric.validation-schema";
import { validateOne } from "../shared/infrastructure/validation";

export { run };

async function run(): Promise<void> {
  logger.info(`[SCRAPER] STARTED`);
  const scraperConfig: MongoDoc<ScraperConfig> = await findScraperConfig();
  logger.info(
    `[SCRAPER] Fetching report number ${scraperConfig.nextReportIndex}`
  );
  const pdfBuffer: ArrayBuffer = await getPdfReport(
    scraperConfig.nextReportIndex
  );
  const parsedPdf = await pdfParse(pdfBuffer);
  const parsedReport: ParsedReport = parseReport(parsedPdf.text);
  const metric: Metric = validateOne(
    {
      timestamp: parsedReport.timestamp,
      data: parsedReport.autonomousCommunitiesData
    },
    metricValidationSchema
  );

  await MetricModel.create(metric);
  scraperConfig.nextReportIndex = scraperConfig.nextReportIndex + 1;
  await scraperConfig.save();
  logger.info(`[SCRAPER] FINISHED`);
}
