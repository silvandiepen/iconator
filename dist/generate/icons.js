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
exports.buildIcons = exports.loadSourceImage = exports.processIcon = exports.createFolder = void 0;
const icons_json_1 = __importDefault(require("../icons.json"));
const cli_block_1 = require("cli-block");
const utils_1 = require("../utils");
const lodash_1 = require("lodash");
// import { isCached, createCacheFile, moveCachedIcons } from "../cache";
const path_1 = require("path");
const png_to_ico_1 = __importDefault(require("png-to-ico"));
const jimp_1 = __importDefault(require("jimp"));
const { writeFile, mkdir } = require("fs").promises;
const createFolder = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    yield mkdir(folder, { recursive: true }, () => {
        return;
    });
});
exports.createFolder = createFolder;
const processIcon = (image, icon, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const processImage = Object.assign(Object.create(Object.getPrototypeOf(image)), image);
    icon.width && icon.height && processImage.scaleToFit(icon.width, icon.height);
    icon.rotate && processImage.rotate(icon.rotate);
    !icon.transparent && processImage.background(0xffffffff);
    const filePath = (0, path_1.join)(payload.output, icon.name);
    const cacheFilePath = (0, path_1.join)(process.cwd(), ".cache/iconator", icon.name);
    yield (0, exports.createFolder)((0, path_1.dirname)(filePath));
    yield (0, exports.createFolder)(".cache/iconator");
    const buffer = yield processImage.getBufferAsync(jimp_1.default.MIME_PNG);
    if ((0, path_1.extname)(icon.name) === ".ico") {
        const icoFile = yield (0, png_to_ico_1.default)(buffer);
        yield writeFile(filePath, icoFile);
        yield writeFile(cacheFilePath, icoFile);
    }
    else {
        yield writeFile(filePath, buffer);
        yield writeFile(cacheFilePath, buffer);
    }
});
exports.processIcon = processIcon;
const loadSourceImage = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceImage = yield jimp_1.default.read(input);
    return sourceImage;
});
exports.loadSourceImage = loadSourceImage;
const buildIcons = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isConfig = (value) => payload.logging.includes(value);
    const fullLog = !isConfig("silent") && !isConfig("minimal");
    const minLog = !isConfig("silent") && isConfig("minimal");
    !isConfig("silent") && (0, cli_block_1.blockMid)("Generate Icons");
    const allIcons = [];
    // const iconIsCached = await isCached(sourceImage, payload);
    // if (iconIsCached) {
    //   await moveCachedIcons(payload);
    //   log.BLOCK_LINE_SUCCESS("Copied all icons from cache");
    // } else {
    // createCacheFile(payload, sourceImage);
    yield (0, utils_1.asyncForEach)(Object.keys(icons_json_1.default), (groupName) => __awaiter(void 0, void 0, void 0, function* () {
        if (!payload.sets || payload.sets.includes(groupName)) {
            if (fullLog) {
                (0, cli_block_1.blockLine)();
                (0, cli_block_1.blockLine)(groupName.toUpperCase());
            }
            else if (minLog) {
                (0, cli_block_1.blockLineSuccess)(groupName);
            }
            // Push all icons into the allIcons for later reference
            for (let i = 0; i < icons_json_1.default[groupName].length; i++) {
                allIcons.push(icons_json_1.default[groupName][i]);
            }
            const sourceImage = yield (0, exports.loadSourceImage)(payload.input);
            yield (0, utils_1.asyncForEach)(icons_json_1.default[groupName], (icon) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield (0, exports.processIcon)((0, lodash_1.cloneDeep)(sourceImage), icon, payload).then(() => {
                        fullLog && (0, cli_block_1.blockLineSuccess)(icon.name);
                    });
                }
                catch (err) {
                    throw Error(err);
                }
            }));
        }
    }));
    // }
    return Object.assign(Object.assign({}, payload), { icons: allIcons });
});
exports.buildIcons = buildIcons;
//# sourceMappingURL=icons.js.map