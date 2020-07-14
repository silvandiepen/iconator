import { ISettings } from "../types";
import { defaultSettings } from "../settings";
import { join } from "path";
export const settings: ISettings = {
	...defaultSettings,
	input: join(__dirname, "../test/test.png"),
	output: "temp/dist",
	logging: ["silent"],
};
