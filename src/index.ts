#!/usr/bin/env node
import { join } from "path";
import { blockSettings, blockFooter, blockHeader } from "cli-block";

// Functionality
import { settings, defaultSettings } from "./settings";
import { buildIcons, buildHtml, buildMetaFiles } from "./generate";
import { Payload, Output } from "./types";
import { hasLogs, level } from "./logging";
import { getFileData } from "@sil/tools";

const buildIt = async (payload: Payload): Promise<Payload> => payload;

const doIconator = async (payload: Payload): Promise<Output> => {
  const packageJson = (await getFileData(
    join(__dirname, "src/package.json")
  )) as any;

  const iconData = await buildIt(payload)
    .then((s) => {
      blockHeader(`Iconator ${packageJson.version} `, { ...level.verbose });
      return s;
    })

    .then(async (s) => {
      if (hasLogs) {
        const filteredSettings = {};
        Object.keys(s).forEach((key) =>
          s[key] !== defaultSettings[key]
            ? (filteredSettings[key] = s[key])
            : false
        );

        await blockSettings(
          s,
          { ...level.verbose },
          {
            exclude: ["package", "logging"],
          }
        );
      }
      return s;
    })
    .then(buildIcons)
    .then(buildMetaFiles)
    .then(buildHtml)
    .then((s) => {
      blockFooter("done!", { ...level.verbose });
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
