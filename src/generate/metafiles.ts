import { asyncForEach, getFileData } from "@sil/tools";
import { join, dirname } from "path";
import { createDir } from "@sil/tools";
import { js2xml } from "xml-js";
import * as log from "cli-block";
const { writeFile } = require("fs").promises;

import { Payload } from "../types";
import { level } from "../logging";

export const buildMetaFiles = async (payload: Payload): Promise<Payload> => {
  const ignoreMeta =
    payload.meta && payload.meta.length == 1 && payload.meta[0] == "none";

  if (ignoreMeta || payload.cached) return payload;

  log.blockLine(``, { ...level.verbose });
  log.blockLineSuccess("Meta files", { ...level.performance });

  const fileData = await getFileData(join(__dirname, "src/files.json"));

  await asyncForEach(Object.keys(fileData), async (category) => {
    if (!payload.meta || payload.meta.includes(category)) {
      await asyncForEach(
        Object.keys(fileData[category]),
        async (filename: string) => {
          const tempFileData = JSON.stringify(fileData[category][filename])
            .replace(/{{color}}/g, payload.color || "")
            .replace(/{{themeColor}}/g, payload.themeColor || "")
            .replace(/{{appName}}/g, payload.appName || "")
            .replace(/{{appDescription}}/g, payload.appDescription || "")
            .replace(/{{appDeveloper}}/g, payload.appDeveloper || "")
            .replace(/{{appDeveloperUrl}}/g, payload.appDeveloperUrl || "");

          const filePath = join(payload.output, filename);
          await createDir(dirname(filePath));

          const fileContent = filePath.includes(".xml")
            ? js2xml(JSON.parse(fileData), { compact: true, spaces: 4 })
            : tempFileData;

          const cacheFilePath = join(
            process.cwd(),
            ".cache/iconator",
            filename
          );

          await writeFile(filePath, fileContent).then(() => {
            log.blockLineSuccess(filename, { ...level.verbose });
          });
          await writeFile(cacheFilePath, fileContent);
        }
      );
    }
  });

  return payload;
};
