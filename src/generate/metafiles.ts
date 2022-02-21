import { Payload } from "../types";
import fileData from "../files.json";
import { asyncForEach } from "../utils";
import { join, dirname } from "path";
import { createFolder } from "./";
import { js2xml } from "xml-js";
import * as log from "cli-block";

const { writeFile } = require("fs").promises;

export const buildMetaFiles = async (payload: Payload): Promise<Payload> => {
  const ignoreMeta =
    payload.meta && payload.meta.length == 1 && payload.meta[0] == "none";
  if (ignoreMeta || payload.cached) return payload;

  if (
    !payload.logging.includes("silent") &&
    !payload.logging.includes("minimal")
  ) {
    log.BLOCK_LINE();
    log.BLOCK_LINE("Meta files".toUpperCase());
  } else if (!payload.logging.includes("silent")) {
    log.BLOCK_LINE_SUCCESS("Meta files");
  }

  await asyncForEach(Object.keys(fileData), async (category) => {
    if (!payload.meta || payload.meta.includes(category)) {
      await asyncForEach(
        Object.keys(fileData[category]),
        async (filename: string) => {
          const tempFileData = JSON.stringify(fileData[category][filename])
            .replace(/{{color}}/g, payload.color)
            .replace(/{{themeColor}}/g, payload.themeColor)
            .replace(/{{appName}}/g, payload.appName)
            .replace(/{{appDescription}}/g, payload.appDescription)
            .replace(/{{appDeveloper}}/g, payload.appDeveloper)
            .replace(/{{appDeveloperUrl}}/g, payload.appDeveloperUrl);

          const filePath = join(payload.output, filename);
          await createFolder(dirname(filePath));

          const fileContent = filePath.includes(".xml")
            ? js2xml(fileData, { compact: true, spaces: 4 })
            : tempFileData;

          const cacheFilePath = join(
            process.cwd(),
            ".cache/iconator",
            filename
          );

          await writeFile(filePath, fileContent).then(() => {
            !payload.logging.includes("silent") &&
              !payload.logging.includes("minimal") &&
              log.BLOCK_LINE_SUCCESS(filename);
          });
          await writeFile(cacheFilePath, fileContent);
        }
      );
    }
  });

  return payload;
};
