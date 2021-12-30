import { LoggerLevel } from "cli-block";

export const loggerSettings = {
  logOutputLevel: LoggerLevel.VERBOSE,
};

export const level = {
  verbose: {
    logLevel: LoggerLevel.VERBOSE,
    ...loggerSettings,
  },
  performance: {
    logLevel: LoggerLevel.PERFORMANCE,
    ...loggerSettings,
  },
  error: {
    logLevel: LoggerLevel.PERFORMANCE,
    ...loggerSettings,
  },
};

export const hasLogs = loggerSettings.logOutputLevel > 0;
