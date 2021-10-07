#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Filesystem
const cli_block_1 = require("cli-block");
// Functionality
const settings_1 = require("./settings");
// import { getPackage } from "./aggregate";
const generate_1 = require("./generate");
const PackageJson = require("../package.json");
const buildIt = (payload) => __awaiter(void 0, void 0, void 0, function* () { return payload; });
const doIconator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const iconData = yield buildIt(payload)
        .then((s) => {
        if (!s.logging.includes("silent") && !s.logging.includes("inline"))
            (0, cli_block_1.blockHeader)(`Iconator ${PackageJson.version} `);
        return s;
    })
        .then((s) => __awaiter(void 0, void 0, void 0, function* () {
        if (!s.logging.includes("silent") && !s.logging.includes("minimal")) {
            const filteredSettings = {};
            Object.keys(s).forEach((key) => s[key] !== settings_1.defaultSettings[key]
                ? (filteredSettings[key] = s[key])
                : false);
            if (s.logging.includes("debug"))
                yield (0, cli_block_1.blockSettings)(s, {}, {
                    exclude: ["package"],
                });
            else if (s.logging.includes("inline"))
                yield (0, cli_block_1.blockSettings)(s, {}, {
                    exclude: ["package", "logging"],
                });
            else
                yield (0, cli_block_1.blockSettings)(filteredSettings, {}, {
                    exclude: ["package"],
                });
        }
        return s;
    }))
        .then(generate_1.buildIcons)
        .then(generate_1.buildMetaFiles)
        .then(generate_1.buildHtml)
        .then((s) => {
        if (!s.logging.includes("silent") && !s.logging.includes("inline")) {
            (0, cli_block_1.blockFooter)("done!");
        }
        return {
            settings: {
                input: s.input,
                output: s.output,
                destination: s.destination,
                color: s.color,
                themeColor: s.themeColor,
                appleStatusBarStyle: s.appleStatusBarStyle,
                appName: s.appName,
                appDeveloper: s.appDeveloper,
                appDeveloperUrl: s.appDeveloperUrl,
                appDescription: s.appDescription,
                url: s.url,
            },
            icons: s.icons,
            html: s.html,
        };
    });
    return iconData;
});
const buildIconator = (config = (0, settings_1.settings)()) => __awaiter(void 0, void 0, void 0, function* () {
    const mergedSettings = Object.assign((0, settings_1.settings)(), config);
    const result = yield doIconator(mergedSettings);
    return result;
});
exports.default = buildIconator;
//# sourceMappingURL=index.js.map