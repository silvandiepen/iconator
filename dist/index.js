#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
// Filesystem
const log = __importStar(require("cli-block"));
// Functionality
const settings_1 = require("./settings");
const aggregate_1 = require("./aggregate");
const generate_1 = require("./generate");
const buildDokkie = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    return settings;
});
buildDokkie(settings_1.settings())
    .then(aggregate_1.getPackage)
    .then((s) => {
    log.START("Iconator");
    log.BLOCK_START();
    log.BLOCK_LINE(`Iconator (${s.package.version}) is generating your icons.`);
    return s;
})
    .then((s) => __awaiter(void 0, void 0, void 0, function* () {
    log.BLOCK_MID("Settings");
    const filteredSettings = {};
    Object.keys(s).forEach((key) => s[key] !== settings_1.defaultSettings[key] ? (filteredSettings[key] = s[key]) : false);
    yield log.BLOCK_SETTINGS(s.debug ? s : filteredSettings, {
        exclude: ["package"],
    });
    return s;
}))
    .then(generate_1.buildIcons)
    .then(generate_1.buildMetaFiles)
    .then(generate_1.buildHtml)
    .then((s) => {
    log.BLOCK_END("done!");
    console.log(s.html);
    return { html: s.html };
});
//# sourceMappingURL=index.js.map