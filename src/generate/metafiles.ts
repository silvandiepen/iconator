import { ISettings } from "../types";
import fileData from "../files.json";
import { asyncForEach } from "cli-block";
import { join, dirname } from "path";
import { createFolder } from "./";
import { js2xml } from "xml-js";
import * as log from "cli-block";

const { writeFile } = require("fs").promises;

export const buildMetaFiles = async (
	settings: ISettings
): Promise<ISettings> => {
	if (
		!settings.logging.includes("silent") &&
		!settings.logging.includes("minimal")
	) {
		log.BLOCK_LINE();
		log.BLOCK_LINE("Meta files".toUpperCase());
	} else if (!settings.logging.includes("silent")) {
		log.BLOCK_LINE_SUCCESS("Meta files");
	}
	await asyncForEach(Object.keys(fileData), async (category) => {
		await asyncForEach(Object.keys(fileData[category]), async (file) => {
			const filedata = JSON.stringify(fileData[category][file])
				.replace(/{{color}}/g, settings.color)
				.replace(/{{themeColor}}/g, settings.themeColor)
				.replace(/{{appName}}/g, settings.appName)
				.replace(/{{appDescription}}/g, settings.appDescription)
				.replace(/{{appDeveloper}}/g, settings.appDeveloper)
				.replace(/{{appDeveloperUrl}}/g, settings.appDeveloperUrl);

			const filePath = join(settings.output, file);
			await createFolder(dirname(filePath));

			console.log(filePath);

			await writeFile(
				filePath,
				filePath.includes(".xml")
					? js2xml(fileData, { compact: true, spaces: 4 })
					: filedata
			).then(() => {
				!settings.logging.includes("silent") &&
					!settings.logging.includes("minimal") &&
					log.BLOCK_LINE_SUCCESS(file);
			});
		});
	});

	return settings;
};
