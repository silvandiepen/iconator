#!/usr/bin/env node

// Filesystem
import * as log from "cli-block";

// Functionality
import { settings, defaultSettings } from "./settings";
import { getPackage } from "./aggregate";
import { buildIcons, buildHtml, buildMetaFiles } from "./generate";
import { Settings, Output } from "./types";

const buildIt = async (settings: Settings): Promise<Settings> => {
  return settings;
};
const doIconator = async (settings: Settings): Promise<Output> => {
  const iconData = await buildIt(settings)
    .then(getPackage)
    .then((s) => {
      if (!s.logging.includes("silent") && !s.logging.includes("inline")) {
        log.START("Iconator");
        log.BLOCK_START();
      }

      !s.logging.includes("silent") &&
        !s.logging.includes("minimal") &&
        log.BLOCK_LINE(
          `Iconator (${s.package.version}) is generating your icons.`
        );
      return s;
    })
    .then(async (s) => {
      if (!s.logging.includes("silent") && !s.logging.includes("minimal")) {
        log.BLOCK_MID("Settings");

        const filteredSettings = {};
        Object.keys(s).forEach((key) =>
          s[key] !== defaultSettings[key]
            ? (filteredSettings[key] = s[key])
            : false
        );
        if (s.logging.includes("debug"))
          await log.BLOCK_SETTINGS(s, {
            exclude: ["package"],
          });
        else
          await log.BLOCK_SETTINGS(filteredSettings, {
            exclude: ["package"],
          });
      }
      return s;
    })
    .then(buildIcons)
    .then(buildMetaFiles)
    .then(buildHtml)
    .then((s) => {
      if (!s.logging.includes("silent") && !s.logging.includes("inline")) {
        log.BLOCK_END("done!");
      }
      return {
        settings: {
          input: s.input,
          output: s.output,
          destination: s.destination,
          color: s.color,
          themeColor: s.themeColor,
          appleStatusBarStyle: s.appleStatusBarStyle,
          appName: s.appName,
          appDeveloper: s.appDeveloper,
          appDeveloperUrl: s.appDeveloperUrl,
          appDescription: s.appDescription,
          url: s.url,
        },
        icons: s.icons,
        html: s.html,
      };
    });
  return iconData;
};

const buildIconator = async (config: Settings = settings()) => {
  const mergedSettings = Object.assign(settings(), config);
  const result = await doIconator(mergedSettings);
  return result;
};
export default buildIconator;
