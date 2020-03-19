import { Config } from "./config.interface";
import { validate } from "../validation";
import { configValidationSchema } from "../validation/schemas/config.validation-schema";

export { config };

const config: Config = validate(
  {
    API_PORT: process.env.API_PORT || 3000,
    MONGO_URI:
      process.env.MONGO_URI || "mongodb://localhost:27017/covid-19-spain"
  },
  configValidationSchema
);
