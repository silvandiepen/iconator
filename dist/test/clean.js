"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = void 0;
const rimraf_1 = __importDefault(require("rimraf"));
const cleanup = (folder) => {
    rimraf_1.default.sync(folder);
};
exports.cleanup = cleanup;
(0, exports.cleanup)("../../temp");
//# sourceMappingURL=clean.js.map