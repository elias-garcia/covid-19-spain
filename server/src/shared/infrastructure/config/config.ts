import { Config } from "./config.interface";
import { validateOne } from "../validation";
import { configValidationSchema } from "../validation/schemas/config.validation-schema";

export { config };

const config: Config = validateOne(
  {
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI
  },
  configValidationSchema
);
