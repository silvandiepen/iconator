import { Settings, Icon } from "../types";
import iconGroups from "../icons.json";
import * as log from "cli-block";
import { asyncForEach } from "../utils";
import { join, dirname, extname } from "path";
import pngToIco from "png-to-ico";
import Jimp from "jimp";

const { writeFile, mkdir } = require("fs").promises;

export const createFolder = async (folder: string): Promise<void> => {
  await mkdir(folder, { recursive: true }, () => {
    return;
  });
};

export const buildIcon = async (
  icon: Icon,
  settings: Settings
): Promise<void> => {
  try {
    await Jimp.read(settings.input)
      .then(async (image) => {
        icon.width && icon.height && image.scaleToFit(icon.width, icon.height);
        icon.rotate && image.rotate(icon.rotate);
        !icon.transparent && image.background(0xffffffff);

        const filePath = join(settings.output, icon.name);
        await createFolder(dirname(filePath));

        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

        if (extname(icon.name) === ".ico") {
          const icoFile = await pngToIco(buffer);
          await writeFile(filePath, icoFile);
        } else {
          await writeFile(filePath, buffer);
        }
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};

export const buildIcons = async (settings: Settings): Promise<Settings> => {
  const isConfig = (value: string): boolean => settings.logging.includes(value);

  !isConfig("silent") && log.BLOCK_MID("Generate Icons");

  const allIcons = [];

  await asyncForEach(Object.keys(iconGroups), async (groupName: string) => {
    if (!settings.sets || settings.sets.includes(groupName)) {
      if (!isConfig("silent") && !isConfig("minimal")) {
        log.BLOCK_LINE();
        log.BLOCK_LINE(groupName.toUpperCase());
      } else if (!isConfig("silent") && isConfig("minimal")) {
        log.BLOCK_LINE_SUCCESS(groupName);
      }

      await asyncForEach(iconGroups[groupName], async (icon: Icon) => {
        allIcons.push(icon);

        try {
          await buildIcon(icon, settings).then(() => {
            !isConfig("silent") &&
              !isConfig("minimal") &&
              log.BLOCK_LINE_SUCCESS(icon.name);
          });
        } catch (err) {
          throw Error(err);
        }
      });
    }
  });

  return { ...settings, icons: allIcons };
};
