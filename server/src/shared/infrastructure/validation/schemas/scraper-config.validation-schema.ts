import * as yup from "yup";

import { ScraperConfig } from "../../database/interfaces/scraper-config.interface";

export { scraperConfigValidationSchema };

const scraperConfigValidationSchema: yup.Schema<ScraperConfig> = yup
  .object()
  .shape({
    nextReportIndex: yup.number().required()
  });
