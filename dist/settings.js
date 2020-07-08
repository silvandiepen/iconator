"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.defaultSettings = void 0;
const yargs_1 = __importDefault(require("yargs"));
exports.defaultSettings = {
    input: "assets/favicon.png",
    output: "img/favicons",
    destination: "img/favicons",
    debug: false,
    logging: [],
    color: "white",
    themeColor: "white",
    appleStatusBarStyle: "default",
    appName: "",
    appDeveloper: "",
    appDeveloperUrl: "",
    appDescription: "",
};
exports.settings = () => {
    const cs = yargs_1.default.options({
        input: {
            required: false,
            type: "string",
            default: exports.defaultSettings.input,
            alias: "i",
        },
        output: {
            required: false,
            type: "string",
            default: exports.defaultSettings.output,
            alias: "o",
        },
        destination: {
            required: false,
            type: "string",
            default: exports.defaultSettings.destination,
            alias: "d",
        },
        color: {
            required: false,
            type: "string",
            default: exports.defaultSettings.color,
            alias: "o",
        },
        themeColor: {
            required: false,
            type: "string",
            default: exports.defaultSettings.themeColor,
            alias: "o",
        },
        appleStatusBarStyle: {
            require: false,
            type: "string",
            default: exports.defaultSettings.appleStatusBarStyle,
        },
        debug: {
            required: false,
            type: "boolean",
            default: exports.defaultSettings.debug,
        },
        appName: {
            required: false,
            type: "string",
            default: exports.defaultSettings.appName,
        },
        appDeveloper: {
            required: false,
            type: "string",
            default: exports.defaultSettings.appDeveloper,
        },
        appDeveloperUrl: {
            required: false,
            type: "string",
            default: exports.defaultSettings.appDeveloperUrl,
        },
        appDescription: {
            required: false,
            type: "string",
            default: exports.defaultSettings.appDescription,
        },
        logging: {
            require: false,
            type: "array",
            default: exports.defaultSettings.logging,
        },
    }).argv;
    return {
        input: cs.input,
        output: cs.output,
        destination: cs.destination,
        debug: cs.debug,
        color: cs.color,
        themeColor: cs.themeColor,
        logging: cs.logging,
        appleStatusBarStyle: cs.appleStatusBarStyle,
        appName: cs.appName,
        appDeveloper: cs.appName,
        appDeveloperUrl: cs.appName,
        appDescription: cs.appName,
    };
};
//# sourceMappingURL=settings.js.map