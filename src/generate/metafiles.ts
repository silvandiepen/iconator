import { ISettings } from "../types";
import fileData from "../files.json";
import { asyncForEach } from "cli-block";
import { join, dirname } from "path";
import { createFolder } from "./";

const { writeFile } = require("fs").promises;

export const buildMetaFiles = async (
	settings: ISettings
): Promise<ISettings> => {
	Object.keys(fileData).forEach(async (category) => {
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
			await writeFile(filePath, filedata);
		});
	});

	return settings;
};
