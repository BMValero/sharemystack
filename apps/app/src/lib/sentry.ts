import * as Sentry from "sentry-expo";

import { config } from "./config";

Sentry.init({
  dsn: config.sentryDsn,
  enableInExpoDevelopment: true,
  debug: false,
});
