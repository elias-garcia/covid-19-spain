import * as yup from "yup";
import { AutonomousCommunity } from "../../database/interfaces/autonomous-community.interface";

export { autonomousCommunityValidationSchema };

const autonomousCommunityValidationSchema: yup.Schema<AutonomousCommunity> = yup
  .object()
  .shape({
    name: yup.string()
  });
