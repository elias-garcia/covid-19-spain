import * as yup from "yup";

import { Metric } from "../../database/interfaces/metric.interface";
import { autonomousCommunityDataValidationSchema } from "./autonomous-community-data.validation-schema";

export { metricValidationSchema };

const metricValidationSchema: yup.Schema<Metric> = yup.object().shape({
  timestamp: yup.date(),
  data: yup.array(autonomousCommunityDataValidationSchema)
});
