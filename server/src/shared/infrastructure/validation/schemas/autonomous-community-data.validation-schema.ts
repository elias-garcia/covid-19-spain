import * as yup from "yup";

import { AutonomousCommunityData } from "../../../domain/autonomous-community-data.interface";

export { autonomousCommunityDataValidationSchema };

const autonomousCommunityDataValidationSchema: yup.Schema<AutonomousCommunityData> = yup
  .object()
  .shape({
    autonomousCommunity: yup.string().required(),
    values: yup.object().shape({
      casos: yup.number().required(),
      fallecidos: yup.number().required()
    })
  });
