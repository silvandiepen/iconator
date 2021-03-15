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
exports.buildMetaFiles = void 0;
const files_json_1 = __importDefault(require("../files.json"));
const cli_block_1 = require("cli-block");
const path_1 = require("path");
const _1 = require("./");
const xml_js_1 = require("xml-js");
const log = __importStar(require("cli-block"));
const { writeFile } = require("fs").promises;
exports.buildMetaFiles = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ignoreMeta = payload.meta && payload.meta.length == 1 && payload.meta[0] == "none";
    if (ignoreMeta || payload.cached)
        return payload;
    if (!payload.logging.includes("silent") &&
        !payload.logging.includes("minimal")) {
        log.BLOCK_LINE();
        log.BLOCK_LINE("Meta files".toUpperCase());
    }
    else if (!payload.logging.includes("silent")) {
        log.BLOCK_LINE_SUCCESS("Meta files");
    }
    yield cli_block_1.asyncForEach(Object.keys(files_json_1.default), (category) => __awaiter(void 0, void 0, void 0, function* () {
        if (!payload.meta || payload.meta.includes(category)) {
            yield cli_block_1.asyncForEach(Object.keys(files_json_1.default[category]), (filename) => __awaiter(void 0, void 0, void 0, function* () {
                const tempFileData = JSON.stringify(files_json_1.default[category][filename])
                    .replace(/{{color}}/g, payload.color)
                    .replace(/{{themeColor}}/g, payload.themeColor)
                    .replace(/{{appName}}/g, payload.appName)
                    .replace(/{{appDescription}}/g, payload.appDescription)
                    .replace(/{{appDeveloper}}/g, payload.appDeveloper)
                    .replace(/{{appDeveloperUrl}}/g, payload.appDeveloperUrl);
                const filePath = path_1.join(payload.output, filename);
                yield _1.createFolder(path_1.dirname(filePath));
                const fileContent = filePath.includes(".xml")
                    ? xml_js_1.js2xml(files_json_1.default, { compact: true, spaces: 4 })
                    : tempFileData;
                const cacheFilePath = path_1.join(process.cwd(), ".cache/iconator", filename);
                yield writeFile(filePath, fileContent).then(() => {
                    !payload.logging.includes("silent") &&
                        !payload.logging.includes("minimal") &&
                        log.BLOCK_LINE_SUCCESS(filename);
                });
                yield writeFile(cacheFilePath, fileContent);
            }));
        }
    }));
    return payload;
});
//# sourceMappingURL=metafiles.js.map