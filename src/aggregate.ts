const { readFile } = require("fs").promises;
import { ISettings } from "./types";

export const getPackage = async (settings: ISettings): Promise<ISettings> => {
	try {
		let PackageData = await readFile("package.json").then((res) =>
			res.toString()
		);
		return { ...settings, package: JSON.parse(PackageData) };
	} catch (err) {
		// console.log(err);
	}
	return settings;
};
