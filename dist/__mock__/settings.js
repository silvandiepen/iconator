"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const settings_1 = require("../settings");
const path_1 = require("path");
exports.settings = Object.assign(Object.assign({}, settings_1.defaultSettings), { input: path_1.join(__dirname, "../test/test.png"), output: "temp/dist", logging: ["silent"] });
//# sourceMappingURL=settings.js.map