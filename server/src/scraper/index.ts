import * as pdfParse from "pdf-parse";

import { ParsedReport } from "./domain/parsed-report.interface";
import { parseReport } from "./application/parse-report";
import { findScraperConfig } from "../shared/application/find-scraper-config";
import { MongoDoc } from "../shared/infrastructure/database/interfaces/mongo-doc.type";
import { ScraperConfig } from "../shared/infrastructure/database/interfaces/scraper-config.interface";
import { getPdfReport } from "./application/get-pdf-report";
import { logger } from "../shared/infrastructure/logging";

export { run };

async function run(): Promise<void> {
  logger.info(`[SCRAPER] STARTED`);
  const scraperConfig: MongoDoc<ScraperConfig> = await findScraperConfig();
  const pdfBuffer: ArrayBuffer = await getPdfReport(
    scraperConfig.nextReportIndex
  );
  const parsedPdf = await pdfParse(pdfBuffer);
  const parsedReport: ParsedReport = parseReport(parsedPdf.text);
  // tslint:disable-next-line: no-console
  console.log(parsedReport);
  logger.info(`[SCRAPER] FINISHED`);
}
