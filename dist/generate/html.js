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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHtml = void 0;
const icons_json_1 = __importDefault(require("../icons.json"));
exports.buildHtml = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    const html = {
        android: [
            `<link rel="manifest" href="{{output}}manifest.json">`,
            `<meta name="mobile-web-app-capable" content="yes">`,
            `<meta name="theme-color" content="{{background}}">`,
            `<meta name="application-name" content="{{appName}}">`,
        ],
        appleIcon: [
            `<link rel="apple-touch-icon" sizes="{{width}}x{{height}}" href="{{output}}apple-touch-icon-{{width}}x{{height}}.png">`,
            `<meta name="apple-mobile-web-app-capable" content="yes">`,
            `<meta name="apple-mobile-web-app-status-bar-style" content="{{appleStatusBarStyle}}">`,
            `<meta name="apple-mobile-web-app-title" content="{{appName}}">`,
        ],
        appleStartup: [
            `<link rel="apple-touch-startup-image" media="(device-width: {{width}}px) and (device-height: {{height}}px) and (-webkit-device-pixel-ratio: {{devicePixelRatio}}) and (orientation: {{orientation}})" href="{{output}}apple-touch-startup-image-{{width}}x{{height}}.png">`,
        ],
        coast: [
            `<link rel="icon" type="image/png" sizes="228x228" href="{{output}}coast-228x228.png">`,
        ],
        favicons: [
            `<link rel="shortcut icon" href="{{output}}favicon.ico">`,
            `<link rel="icon" type="image/png" sizes="{{width}}x{{height}}" href="{{output}}favicon-{{width}}x{{height}}.png">`,
        ],
        windows: [
            `<meta name="msapplication-TileColor" content="{{background}}">`,
            `<meta name="msapplication-TileImage" content="{{output}}mstile-144x144.png">`,
            `<meta name="msapplication-config" content="{{output}}browserconfig.xml">`,
        ],
        yandex: [
            `<link rel="yandex-tableau-widget" href="{{output}}yandex-browser-manifest.json">`,
        ],
    };
    const lines = [];
    Object.keys(html).forEach((category) => {
        html[category].forEach((line) => {
            icons_json_1.default[category].forEach((icon) => {
                var _a, _b, _c;
                if (line.indexOf("{{width}}") && !icon.width)
                    return;
                let newLine = line
                    .replace(/{{appleStatusBarStyle}}/, settings.appleStatusBarStyle)
                    .replace(/{{appName}}/g, settings.appName)
                    .replace(/{{background}}/g, settings.color)
                    .replace(/{{themeColor}}/g, settings.themeColor)
                    .replace(/{{output}}/g, settings.output + "/")
                    .replace(/{{width}}/g, (_a = icon.width) === null || _a === void 0 ? void 0 : _a.toString())
                    .replace(/{{orientation}}/g, icon.orientation)
                    .replace(/{{devicePixelRatio}}/g, (_b = icon.devicePxRatio) === null || _b === void 0 ? void 0 : _b.toString())
                    .replace(/{{height}}/g, (_c = icon.height) === null || _c === void 0 ? void 0 : _c.toString());
                lines.push(newLine);
            });
        });
    });
    let metaData = [...new Set(lines)];
    return Object.assign(Object.assign({}, settings), { html: metaData });
});
//# sourceMappingURL=html.js.map