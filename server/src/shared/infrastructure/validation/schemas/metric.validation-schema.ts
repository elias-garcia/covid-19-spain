import * as yup from "yup";

import { Metric } from "../../database/interfaces/metric.interface";
import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";

export { metricValidationSchema };

const autonomousCommunityDataValidationSchema: yup.Schema<AutonomousCommunityData> = yup
  .object()
  .shape({
    autonomousCommunity: yup.string().required(),
    values: yup.object().shape({
      casos: yup.number().required(),
      fallecidos: yup.number().required()
    })
  });

const metricValidationSchema: yup.Schema<Metric> = yup.object().shape({
  timestamp: yup.date(),
  data: yup.array(autonomousCommunityDataValidationSchema)
});
