import yargs from "yargs";
import { ISettings } from "./types";

export const defaultSettings = {
	input: "assets/favicon.png",
	output: "img/favicons",
	debug: false,
	color: "white",
	themeColor: "white",
	appleStatusBarStyle: "default",
	appName: "",
	appDeveloper: "",
	appDeveloperUrl: "",
	appDescription: "",
};

export const settings = (): ISettings => {
	const cs = yargs.options({
		input: {
			required: false,
			type: "string",
			default: defaultSettings.input,
			alias: "i",
		},
		output: {
			required: false,
			type: "string",
			default: defaultSettings.output,
			alias: "o",
		},
		color: {
			required: false,
			type: "string",
			default: defaultSettings.color,
			alias: "o",
		},
		themeColor: {
			required: false,
			type: "string",
			default: defaultSettings.themeColor,
			alias: "o",
		},
		appleStatusBarStyle: {
			require: false,
			type: "string",
			default: defaultSettings.appleStatusBarStyle,
		},
		debug: {
			required: false,
			type: "boolean",
			default: defaultSettings.debug,
		},
		appName: {
			required: false,
			type: "string",
			default: defaultSettings.appName,
		},
		appDeveloper: {
			required: false,
			type: "string",
			default: defaultSettings.appDeveloper,
		},
		appDeveloperUrl: {
			required: false,
			type: "string",
			default: defaultSettings.appDeveloperUrl,
		},
		appDescription: {
			required: false,
			type: "string",
			default: defaultSettings.appDescription,
		},
	}).argv;

	return {
		input: cs.input,
		output: cs.output,
		debug: cs.debug,
		color: cs.color,
		themeColor: cs.themeColor,
		appleStatusBarStyle: cs.appleStatusBarStyle,
		appName: cs.appName,
		appDeveloper: cs.appName,
		appDeveloperUrl: cs.appName,
		appDescription: cs.appName,
	};
};
