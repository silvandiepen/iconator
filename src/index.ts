#!/usr/bin/env node

// Filesystem
import * as log from "cli-block";

// Functionality
import { settings, defaultSettings } from "./settings";
import { getPackage } from "./aggregate";
import { buildIcons, buildHtml, buildMetaFiles } from "./generate";
import { ISettings } from "./types";

const buildIt = async (settings: ISettings): Promise<ISettings> => {
	return settings;
};
const doIconator = async (settings: ISettings): Promise<ISettings> => {
	const icons = await buildIt(settings)
		.then(getPackage)
		.then((s) => {
			!settings.silent && log.START("Iconator");
			!settings.silent && log.BLOCK_START();
			!settings.silent &&
				log.BLOCK_LINE(
					`Iconator (${s.package.version}) is generating your icons.`
				);
			return s;
		})
		.then(async (s) => {
			!settings.silent && log.BLOCK_MID("Settings");

			const filteredSettings = {};
			Object.keys(s).forEach((key) =>
				s[key] !== defaultSettings[key]
					? (filteredSettings[key] = s[key])
					: false
			);

			!settings.silent &&
				(await log.BLOCK_SETTINGS(s.debug ? s : filteredSettings, {
					exclude: ["package"],
				}));
			return s;
		})
		.then(buildIcons)
		.then(buildMetaFiles)
		.then(buildHtml)
		.then((s) => {
			!settings.silent && log.BLOCK_END("done!");
			return { ...s, html: s.html };
		});
	return icons;
};

const buildIconator = async (config: ISettings = settings()) => {
	const mergedSettings = Object.assign(settings(), config);
	await doIconator(mergedSettings);
};
export default buildIconator;
