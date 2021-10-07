import { Payload, Icon } from "../types";
import iconGroups from "../icons.json";
import { blockLine, blockMid, blockLineSuccess } from "cli-block";
import { asyncForEach } from "../utils";
// import { isCached, createCacheFile, moveCachedIcons } from "../cache";

import { join, dirname, extname } from "path";
import pngToIco from "png-to-ico";
import Jimp from "jimp";

const { writeFile, mkdir } = require("fs").promises;
export const createFolder = async (folder: string): Promise<void> => {
  await mkdir(folder, { recursive: true }, () => {
    return;
  });
};

export const processIcon = async (image, icon, payload): Promise<void> => {
  const processImage = Object.assign(
    Object.create(Object.getPrototypeOf(image)),
    image
  );

  icon.width && icon.height && processImage.scaleToFit(icon.width, icon.height);
  icon.rotate && processImage.rotate(icon.rotate);
  !icon.transparent && processImage.background(0xffffffff);

  const filePath = join(payload.output, icon.name);
  const cacheFilePath = join(process.cwd(), ".cache/iconator", icon.name);

  await createFolder(dirname(filePath));
  await createFolder(".cache/iconator");

  const buffer = await processImage.getBufferAsync(Jimp.MIME_PNG);

  if (extname(icon.name) === ".ico") {
    const icoFile = await pngToIco(buffer);
    await writeFile(filePath, icoFile);
    await writeFile(cacheFilePath, icoFile);
  } else {
    await writeFile(filePath, buffer);
    await writeFile(cacheFilePath, buffer);
  }
};

export const loadSourceImage = async (payload: Payload) => {
  const sourceImage = await Jimp.read(payload.input);
  return sourceImage;
};

export const buildIcons = async (payload: Payload): Promise<Payload> => {
  const isConfig = (value: string): boolean => payload.logging.includes(value);
  const fullLog = !isConfig("silent") && !isConfig("minimal");
  const minLog = !isConfig("silent") && isConfig("minimal");

  !isConfig("silent") && blockMid("Generate Icons");

  const allIcons = [];
  const sourceImage = await loadSourceImage(payload);
  // const iconIsCached = await isCached(sourceImage, payload);

  // if (iconIsCached) {
  //   await moveCachedIcons(payload);
  //   log.BLOCK_LINE_SUCCESS("Copied all icons from cache");
  // } else {
  // createCacheFile(payload, sourceImage);
  await asyncForEach(Object.keys(iconGroups), async (groupName: string) => {
    if (!payload.sets || payload.sets.includes(groupName)) {
      if (fullLog) {
        blockLine();
        blockLine(groupName.toUpperCase());
      } else if (minLog) {
        blockLineSuccess(groupName);
      }

      // Push all icons into the allIcons for later reference
      for (let i = 0; i < iconGroups[groupName].length; i++) {
        allIcons.push(iconGroups[groupName][i]);
      }

      await asyncForEach(iconGroups[groupName], async (icon: Icon) => {
        try {
          await processIcon(sourceImage, icon, payload).then(() => {
            fullLog && blockLineSuccess(icon.name);
          });
        } catch (err) {
          throw Error(err);
        }
      });
    }
  });
  // }
  return {
    ...payload,
    icons: allIcons,
    //cached: iconIsCached
  };
};
