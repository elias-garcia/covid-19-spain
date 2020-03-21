import * as yup from "yup";

import { Report, ReportData } from "../../../domain/report.interface";

export { reportValidationSchema };

const reportDataValidationSchema: yup.Schema<ReportData> = yup.object().shape({
  autonomousCommunity: yup.string().required(),
  values: yup.object().shape({
    cases: yup.number().required(),
    deaths: yup.number().required()
  })
});

const reportValidationSchema: yup.Schema<Report> = yup.object().shape({
  timestamp: yup.date(),
  data: yup
    .array()
    .of(reportDataValidationSchema)
    .required()
});
