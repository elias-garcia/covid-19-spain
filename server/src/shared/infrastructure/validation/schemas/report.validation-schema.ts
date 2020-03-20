import * as yup from "yup";

import { Report } from "../../database/interfaces/report.interface";
import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";

export { reportValidationSchema };

const autonomousCommunityDataValidationSchema: yup.Schema<AutonomousCommunityData> = yup
  .object()
  .shape({
    autonomousCommunity: yup.string().required(),
    values: yup.object().shape({
      casos: yup.number().required(),
      fallecidos: yup.number().required()
    })
  });

const reportValidationSchema: yup.Schema<Report> = yup.object().shape({
  timestamp: yup.date(),
  data: yup
    .array()
    .of(autonomousCommunityDataValidationSchema)
    .required()
});
