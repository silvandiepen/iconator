import { ISettings, IIcon } from "../types";
import iconGroups from "../icons.json";
import * as log from "cli-block";
import { asyncForEach } from "../utils";
import sharp from "sharp";
import { join, dirname, extname } from "path";
import pngToIco from "png-to-ico";

const { writeFile, mkdir } = require("fs").promises;

export const createFolder = async (folder): Promise<void> => {
	await mkdir(folder, { recursive: true }, () => {
		return;
	});
};

const buildIcon = async (icon: IIcon, settings: ISettings): Promise<void> => {
	await sharp(settings.input)
		.rotate(icon.rotate ? icon.rotate : 0)
		.resize(icon.width, icon.height)
		.flatten(
			icon.transparent ? false : { background: { r: 255, g: 255, b: 255 } }
		)
		.toBuffer()
		.then(async (data) => {
			const filePath = join(settings.output, icon.name);
			await createFolder(dirname(filePath));

			if (extname(icon.name) === ".ico") {
				await writeFile(filePath, pngToIco(data));
			} else {
				await writeFile(filePath, data);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const buildIcons = async (settings: ISettings): Promise<ISettings> => {
	log.BLOCK_MID("Generate Icons");

	const allIcons = [];

	await asyncForEach(Object.keys(iconGroups), async (groupName: string) => {
		log.BLOCK_LINE();
		log.BLOCK_LINE(groupName.toUpperCase());
		await asyncForEach(iconGroups[groupName], async (icon: IIcon) => {
			allIcons.push(icon);
			await buildIcon(icon, settings).then(() => {
				log.BLOCK_LINE_SUCCESS(icon.name);
			});
		});
	});
	return { ...settings, icons: allIcons };
};
