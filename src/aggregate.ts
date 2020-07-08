const { readFile } = require("fs").promises;
import { join } from "path";
import { ISettings } from "./types";

export const getPackage = async (settings: ISettings): Promise<ISettings> => {
	try {
		let PackageData = await readFile(
			join(__dirname, "../package.json")
		).then((res) => res.toString());
		return { ...settings, package: JSON.parse(PackageData) };
	} catch (err) {
		// console.log(err);
	}
	return settings;
};
