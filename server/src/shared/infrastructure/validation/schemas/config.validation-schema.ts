import * as yup from "yup";

import { Config } from "../../config/config.interface";

export { configValidationSchema };

const configValidationSchema: yup.Schema<Config> = yup.object().shape<Config>({
  NODE_ENV: yup
    .mixed()
    .oneOf(["development", "production"])
    .required(),
  API_PORT: yup.number().required(),
  MONGO_URI: yup.string().required()
});
