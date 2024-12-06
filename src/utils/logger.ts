import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export const logger = {
  log: (message: string, data?: any) => {
    console.log(message, data);
    Sentry.addBreadcrumb({
      category: 'log',
      message: message,
      level: Sentry.Severity.Info,
      data: data
    });
  },
  error: (error: Error, context?: any) => {
    console.error(error);
    Sentry.captureException(error, { extra: context });
  },
  warn: (message: string, data?: any) => {
    console.warn(message, data);
    Sentry.addBreadcrumb({
      category: 'warning',
      message: message,
      level: Sentry.Severity.Warning,
      data: data
    });
  }
};