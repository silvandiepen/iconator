import { ISettings } from "../types";
import { defaultSettings } from "../settings";

export const settings: ISettings = {
	...defaultSettings,
	input: "test/test.png",
	output: "temp/dist",
	logging: ["silent"],
};
