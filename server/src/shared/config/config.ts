import * as yup from "yup";

import { Config } from "./config.interface";

export { config };

const config: Config = yup
  .object()
  .shape<Config>({
    API_PORT: yup.number().required(),
    MONGO_URI: yup.string().required()
  })
  .validateSync({
    API_PORT: process.env.API_PORT || 3000,
    MONGO_URI:
      process.env.MONGO_URI || "mongodb://localhost:27017/covid-19-spain"
  });
