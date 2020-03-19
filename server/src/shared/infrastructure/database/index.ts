import * as mongooose from "mongoose";

import { config } from "../config/config";

export { connect };

async function connect(): Promise<void> {
  await mongooose.connect(config.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}
