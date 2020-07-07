"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.buildIcons = exports.buildIcon = exports.createFolder = void 0;
const icons_json_1 = __importDefault(require("../icons.json"));
const log = __importStar(require("cli-block"));
const utils_1 = require("../utils");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = require("path");
const png_to_ico_1 = __importDefault(require("png-to-ico"));
const { writeFile, mkdir } = require("fs").promises;
exports.createFolder = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    yield mkdir(folder, { recursive: true }, () => {
        return;
    });
});
exports.buildIcon = (icon, settings) => __awaiter(void 0, void 0, void 0, function* () {
    yield sharp_1.default(settings.input)
        .rotate(icon.rotate ? icon.rotate : 0)
        .resize(icon.width, icon.height)
        .flatten(icon.transparent ? false : { background: { r: 255, g: 255, b: 255 } })
        .toBuffer()
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.join(settings.output, icon.name);
        yield exports.createFolder(path_1.dirname(filePath));
        if (path_1.extname(icon.name) === ".ico") {
            yield writeFile(filePath, png_to_ico_1.default(data));
        }
        else {
            yield writeFile(filePath, data);
        }
    }))
        .catch((err) => {
        console.log(err);
    });
});
exports.buildIcons = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    !settings.silent && log.BLOCK_MID("Generate Icons");
    const allIcons = [];
    yield utils_1.asyncForEach(Object.keys(icons_json_1.default), (groupName) => __awaiter(void 0, void 0, void 0, function* () {
        !settings.silent && log.BLOCK_LINE();
        !settings.silent && log.BLOCK_LINE(groupName.toUpperCase());
        yield utils_1.asyncForEach(icons_json_1.default[groupName], (icon) => __awaiter(void 0, void 0, void 0, function* () {
            allIcons.push(icon);
            yield exports.buildIcon(icon, settings).then(() => {
                !settings.silent && log.BLOCK_LINE_SUCCESS(icon.name);
            });
        }));
    }));
    return Object.assign(Object.assign({}, settings), { icons: allIcons });
});
//# sourceMappingURL=icons.js.map