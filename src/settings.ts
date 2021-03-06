import yargs from "yargs";
import { Payload } from "./types";

export const defaultSettings = {
  input: "assets/favicon.png",
  output: "img/favicons",
  destination: "",
  debug: false,
  logging: [],
  sets: [],
  meta: [],
  color: "white",
  themeColor: "white",
  appleStatusBarStyle: "default",
  appName: "",
  appDeveloper: "",
  appDeveloperUrl: "",
  appDescription: "",
  url: "",
};

export const settings = (): Payload => {
  const cs = (yargs as any).options({
    input: {
      required: false,
      type: "string",
      default: defaultSettings.input,
      alias: "i",
    },
    output: {
      required: false,
      type: "string",
      default: defaultSettings.output,
      alias: "o",
    },
    destination: {
      required: false,
      type: "string",
      default: defaultSettings.destination,
      alias: "d",
    },
    color: {
      required: false,
      type: "string",
      default: defaultSettings.color,
      alias: "o",
    },
    themeColor: {
      required: false,
      type: "string",
      default: defaultSettings.themeColor,
      alias: "o",
    },
    appleStatusBarStyle: {
      require: false,
      type: "string",
      default: defaultSettings.appleStatusBarStyle,
    },
    sets: {
      required: false,
      type: "array",
      default: defaultSettings.sets,
    },
    meta: {
      required: false,
      type: "array",
      default: defaultSettings.meta,
    },
    debug: {
      required: false,
      type: "boolean",
      default: defaultSettings.debug,
    },
    appName: {
      required: false,
      type: "string",
      default: defaultSettings.appName,
    },
    appDeveloper: {
      required: false,
      type: "string",
      default: defaultSettings.appDeveloper,
    },
    appDeveloperUrl: {
      required: false,
      type: "string",
      default: defaultSettings.appDeveloperUrl,
    },
    appDescription: {
      required: false,
      type: "string",
      default: defaultSettings.appDescription,
    },
    logging: {
      require: false,
      type: "array",
      default: defaultSettings.logging,
    },
    url: {
      require: false,
      type: "string",
      default: defaultSettings.url,
    },
  }).argv;

  return {
    input: cs.input,
    output: cs.output,
    destination: cs.destination,
    debug: cs.debug,
    color: cs.color,
    themeColor: cs.themeColor,
    logging: cs.logging,
    appleStatusBarStyle: cs.appleStatusBarStyle,
    appName: cs.appName,
    appDeveloper: cs.appName,
    appDeveloperUrl: cs.appName,
    appDescription: cs.appName,
    url: cs.url,
    sets: cs.icons,
  };
};
