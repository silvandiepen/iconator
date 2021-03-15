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
exports.buildIcons = exports.loadSourceImage = exports.processIcon = exports.createFolder = void 0;
const icons_json_1 = __importDefault(require("../icons.json"));
const log = __importStar(require("cli-block"));
const utils_1 = require("../utils");
const cache_1 = require("../cache");
const path_1 = require("path");
const png_to_ico_1 = __importDefault(require("png-to-ico"));
const jimp_1 = __importDefault(require("jimp"));
const { writeFile, mkdir } = require("fs").promises;
exports.createFolder = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    yield mkdir(folder, { recursive: true }, () => {
        return;
    });
});
exports.processIcon = (image, icon, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const processImage = Object.assign(Object.create(Object.getPrototypeOf(image)), image);
    icon.width && icon.height && processImage.scaleToFit(icon.width, icon.height);
    icon.rotate && processImage.rotate(icon.rotate);
    !icon.transparent && processImage.background(0xffffffff);
    const filePath = path_1.join(payload.output, icon.name);
    const cacheFilePath = path_1.join(process.cwd(), ".cache/iconator", icon.name);
    yield exports.createFolder(path_1.dirname(filePath));
    yield exports.createFolder(".cache/iconator");
    const buffer = yield processImage.getBufferAsync(jimp_1.default.MIME_PNG);
    if (path_1.extname(icon.name) === ".ico") {
        const icoFile = yield png_to_ico_1.default(buffer);
        yield writeFile(filePath, icoFile);
        yield writeFile(cacheFilePath, icoFile);
    }
    else {
        yield writeFile(filePath, buffer);
        yield writeFile(cacheFilePath, buffer);
    }
});
exports.loadSourceImage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceImage = yield jimp_1.default.read(payload.input);
    return sourceImage;
});
exports.buildIcons = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isConfig = (value) => payload.logging.includes(value);
    const fullLog = !isConfig("silent") && !isConfig("minimal");
    const minLog = !isConfig("silent") && isConfig("minimal");
    !isConfig("silent") && log.BLOCK_MID("Generate Icons");
    const allIcons = [];
    const sourceImage = yield exports.loadSourceImage(payload);
    const iconIsCached = yield cache_1.isCached(sourceImage, payload);
    if (iconIsCached) {
        yield cache_1.moveCachedIcons(payload);
        log.BLOCK_LINE_SUCCESS("Copied all icons from cache");
    }
    else {
        cache_1.createCacheFile(payload, sourceImage);
        yield utils_1.asyncForEach(Object.keys(icons_json_1.default), (groupName) => __awaiter(void 0, void 0, void 0, function* () {
            if (!payload.sets || payload.sets.includes(groupName)) {
                if (fullLog) {
                    log.BLOCK_LINE();
                    log.BLOCK_LINE(groupName.toUpperCase());
                }
                else if (minLog) {
                    log.BLOCK_LINE_SUCCESS(groupName);
                }
                // Push all icons into the allIcons for later reference
                for (let i = 0; i < icons_json_1.default[groupName].length; i++) {
                    allIcons.push(icons_json_1.default[groupName][i]);
                }
                yield utils_1.asyncForEach(icons_json_1.default[groupName], (icon) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        yield exports.processIcon(sourceImage, icon, payload).then(() => {
                            fullLog && log.BLOCK_LINE_SUCCESS(icon.name);
                        });
                    }
                    catch (err) {
                        throw Error(err);
                    }
                }));
            }
        }));
    }
    return Object.assign(Object.assign({}, payload), { icons: allIcons, cached: iconIsCached });
});
//# sourceMappingURL=icons.js.map