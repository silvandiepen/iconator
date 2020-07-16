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

export const buildIcon = async (
	icon: IIcon,
	settings: ISettings
): Promise<void> => {
	try {
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
					const icoFile = await pngToIco(data);
					await writeFile(filePath, icoFile);
				} else {
					await writeFile(filePath, data);
				}
			})
			.catch((err) => {
				throw Error(err);
			});
	} catch (err) {
		throw Error(err);
	}
};

export const buildIcons = async (settings: ISettings): Promise<ISettings> => {
	!settings.logging.includes("silent") && log.BLOCK_MID("Generate Icons");

	const allIcons = [];

	await asyncForEach(Object.keys(iconGroups), async (groupName: string) => {
		if (
			!settings.logging.includes("silent") &&
			!settings.logging.includes("minimal")
		) {
			log.BLOCK_LINE();
			log.BLOCK_LINE(groupName.toUpperCase());
		} else if (
			!settings.logging.includes("silent") &&
			settings.logging.includes("minimal")
		) {
			log.BLOCK_LINE_SUCCESS(groupName);
		}

		await asyncForEach(iconGroups[groupName], async (icon: IIcon) => {
			allIcons.push(icon);

			try {
				await buildIcon(icon, settings).then(() => {
					!settings.logging.includes("silent") &&
						!settings.logging.includes("minimal") &&
						log.BLOCK_LINE_SUCCESS(icon.name);
				});
			} catch (err) {
				throw Error(err);
			}
		});
	});
	return { ...settings, icons: allIcons };
};
