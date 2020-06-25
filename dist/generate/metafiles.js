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
exports.buildMetaFiles = void 0;
const files_json_1 = __importDefault(require("../files.json"));
const cli_block_1 = require("cli-block");
const path_1 = require("path");
const _1 = require("./");
const { writeFile } = require("fs").promises;
exports.buildMetaFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    Object.keys(files_json_1.default).forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
        yield cli_block_1.asyncForEach(Object.keys(files_json_1.default[category]), (file) => __awaiter(void 0, void 0, void 0, function* () {
            const filedata = JSON.stringify(files_json_1.default[category][file])
                .replace(/{{color}}/g, settings.color)
                .replace(/{{themeColor}}/g, settings.themeColor)
                .replace(/{{appName}}/g, settings.appName)
                .replace(/{{appDescription}}/g, settings.appDescription)
                .replace(/{{appDeveloper}}/g, settings.appDeveloper)
                .replace(/{{appDeveloperUrl}}/g, settings.appDeveloperUrl);
            const filePath = path_1.join(settings.output, file);
            yield _1.createFolder(path_1.dirname(filePath));
            yield writeFile(filePath, filedata);
        }));
    }));
    return settings;
});
//# sourceMappingURL=metafiles.js.map