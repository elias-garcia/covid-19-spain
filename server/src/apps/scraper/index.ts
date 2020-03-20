import * as pdfParse from "pdf-parse";
import * as cron from "node-cron";

import { ParsedReport } from "./domain/parsed-report.interface";
import { parseReport } from "./application/parse-report";
import { findScraperConfig } from "../../shared/application/find-scraper-config";
import { MongoDoc } from "../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { ScraperConfig } from "../../shared/infrastructure/database/interfaces/scraper-config.interface";
import { getPdfReport } from "./application/get-pdf-report";
import { logger } from "../../shared/infrastructure/logging";
import { Report } from "../../shared/infrastructure/database/interfaces/report.interface";
import { ReportModel } from "../../shared/infrastructure/database/models/report.model";
import { metricValidationSchema } from "../../shared/infrastructure/validation/schemas/report.validation-schema";
import { validateOne } from "../../shared/infrastructure/validation";
import { ReportNotYetAvailable } from "./domain/report-not-yet-available.error";
import { CRON_EXPRESSION } from "./constants";

export { runUntilGetUpToDate, scheduleRun };

function scheduleRun(): void {
  logger.info(
    `[SCRAPER] Scheduling run with cron expression ${CRON_EXPRESSION}...`
  );
  cron.schedule(CRON_EXPRESSION, async () => {
    try {
      await run();
    } catch (error) {
      logger.error(error);
    }
  });
  logger.info(
    `[SCRAPER] Scheduling run with cron expression ${CRON_EXPRESSION}... OK`
  );
}

async function runUntilGetUpToDate(): Promise<void> {
  logger.info(`[SCRAPER] Getting metrics up to date...`);
  while (true) {
    try {
      await run();
    } catch (error) {
      if (error instanceof ReportNotYetAvailable) {
        logger.info("[SCRAPER] Getting metrics up to date... OK");
        break;
      }
    }
  }
}

async function run(): Promise<void> {
  logger.info(`[SCRAPER] STARTED`);
  const scraperConfig: MongoDoc<ScraperConfig> = await findScraperConfig();
  logger.info(
    `[SCRAPER] Fetching report number ${scraperConfig.nextReportIndex}`
  );
  const pdfBuffer: ArrayBuffer = await getPdfReport(
    scraperConfig.nextReportIndex
  );
  logger.info(`[SCRAPER] Parsing report...`);
  const parsedPdf = await pdfParse(pdfBuffer);
  const parsedReport: ParsedReport = parseReport(parsedPdf.text);
  logger.info(`[SCRAPER] Parsing report... OK`);
  const report: Report = validateOne(
    {
      timestamp: parsedReport.timestamp,
      data: parsedReport.autonomousCommunitiesData
    },
    metricValidationSchema
  );

  await ReportModel.create(report);
  scraperConfig.nextReportIndex = scraperConfig.nextReportIndex + 1;
  await scraperConfig.save();
  logger.info(`[SCRAPER] FINISHED`);
}
