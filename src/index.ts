#!/usr/bin/env node

// Filesystem
import { blockSettings, blockFooter, blockHeader } from "cli-block";

// Functionality
import { settings, defaultSettings } from "./settings";
// import { getPackage } from "./aggregate";
import { buildIcons, buildHtml, buildMetaFiles } from "./generate";
import { Payload, Output } from "./types";

const PackageJson = require("../package.json");

const buildIt = async (payload: Payload): Promise<Payload> => payload;

let timer = Date.now();

const doIconator = async (payload: Payload): Promise<Output> => {
  const iconData = await buildIt(payload)
    .then((s) => {
      if (!s.logging.includes("silent") && !s.logging.includes("inline"))
        blockHeader(`Iconator ${PackageJson.version} `);
      return s;
    })
    .then(async (s) => {
      if (!s.logging.includes("silent") && !s.logging.includes("minimal")) {
        const filteredSettings = {};
        Object.keys(s).forEach((key) =>
          s[key] !== defaultSettings[key]
            ? (filteredSettings[key] = s[key])
            : false
        );
        if (s.logging.includes("debug"))
          await blockSettings(
            s,
            {},
            {
              exclude: ["package"],
            }
          );
        else if (s.logging.includes("inline"))
          await blockSettings(
            s,
            {},
            {
              exclude: ["package", "logging"],
            }
          );
        else
          await blockSettings(
            filteredSettings,
            {},
            {
              exclude: ["package"],
            }
          );
      }
      return s;
    })
    .then(buildIcons)
    .then(buildMetaFiles)
    .then(buildHtml)
    .then((s) => {
      const diff = Date.now() - timer;

      if (!s.logging.includes("silent") && !s.logging.includes("inline")) {
        blockFooter(`done in ${Math.round(diff / 100) / 10}s!`);
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

const buildIconator = async (config: Payload = settings()) => {
  const mergedSettings = Object.assign(settings(), config);
  const result = await doIconator(mergedSettings);
  return result;
};
export default buildIconator;
