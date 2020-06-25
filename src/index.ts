#!/usr/bin/env node

// Filesystem
import * as log from "cli-block";

// Functionality
import { settings, defaultSettings } from "./settings";
import { getPackage } from "./aggregate";
import { buildIcons, buildHtml, buildMetaFiles } from "./generate";
import { ISettings } from "./types";

const buildIconator = async (settings: ISettings): Promise<ISettings> => {
	return settings;
};

buildIconator(settings())
	.then(getPackage)
	.then((s) => {
		log.START("Iconator");
		log.BLOCK_START();
		log.BLOCK_LINE(`Iconator (${s.package.version}) is generating your icons.`);
		return s;
	})
	.then(async (s) => {
		log.BLOCK_MID("Settings");

		const filteredSettings = {};
		Object.keys(s).forEach((key) =>
			s[key] !== defaultSettings[key] ? (filteredSettings[key] = s[key]) : false
		);

		await log.BLOCK_SETTINGS(s.debug ? s : filteredSettings, {
			exclude: ["package"],
		});
		return s;
	})
	.then(buildIcons)
	.then(buildMetaFiles)
	.then(buildHtml)
	.then((s) => {
		log.BLOCK_END("done!");
		return { html: s.html };
	});
