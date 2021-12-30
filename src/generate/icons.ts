import { join, dirname, extname } from "path";
import { read, MIME_PNG } from "jimp";
import { asyncForEach, createDir, getFileData } from "@sil/tools";
const pngToIco = require("png-to-ico");
const { writeFile } = require("fs").promises;

import { Payload, Icon, IconData } from "../types";
import { blockLine, blockMid, blockLineSuccess } from "cli-block";
import { level } from "../logging";
// import { isCached, createCacheFile, moveCachedIcons } from "../cache";

export const getJsonData = async (filePath: string): Promise<{}> => {
  const data = await getFileData(filePath);
  return JSON.parse(data);
};
export const processIcon = async (
  image,
  icon: Icon,
  payload: Payload
): Promise<void> => {
  const processImage = Object.assign(
    Object.create(Object.getPrototypeOf(image)),
    image
  );

  icon.width && icon.height && processImage.scaleToFit(icon.width, icon.height);
  icon.rotate && processImage.rotate(icon.rotate);
  !icon.transparent && processImage.background(0xffffffff);

  const filePath = join(payload.output, icon.name);
  const cacheFilePath = join(process.cwd(), ".cache/iconator", icon.name);

  await createDir(dirname(filePath));
  await createDir(".cache/iconator");

  const buffer = await processImage.getBufferAsync(MIME_PNG);

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
  const sourceImage = await read(payload.input);
  return sourceImage;
};

export const buildIcons = async (payload: Payload): Promise<Payload> => {
  blockMid("Generate Icons", { ...level.error });

  const allIcons: any[] = [];
  const sourceImage = await loadSourceImage(payload);
  // const iconIsCached = await isCached(sourceImage, payload);

  // if (iconIsCached) {
  //   await moveCachedIcons(payload);
  //   log.BLOCK_LINE_SUCCESS("Copied all icons from cache");
  // } else {
  // createCacheFile(payload, sourceImage);

  const iconGroups = (await getJsonData(
    join(__dirname, "src/icons.json")
  )) as IconData;

  await asyncForEach(Object.keys(iconGroups), async (groupName: string) => {
    if (!payload.sets || payload.sets.includes(groupName)) {
      blockLine(``, { ...level.verbose });
      blockLine(groupName.toUpperCase());

      // Push all icons into the allIcons for later reference
      for (let i = 0; i < iconGroups[groupName].length; i++) {
        const group = iconGroups[groupName][i];
        allIcons.push(group);
      }

      await asyncForEach(iconGroups[groupName], async (icon: Icon) => {
        try {
          await processIcon(sourceImage, icon, payload).then(() => {
            blockLineSuccess(icon.name, { ...level.verbose });
          });
        } catch (err: any) {
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
