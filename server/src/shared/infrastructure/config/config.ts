import { Config } from "./config.interface";
import { validateOne } from "../validation";
import { configValidationSchema } from "../validation/schemas/config.validation-schema";

export { config };

const config: Config = validateOne(
  {
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: process.env.API_PORT,
    MONGO_URI: process.env.MONGO_URI
  },
  configValidationSchema
);
