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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackage = void 0;
const { readFile } = require("fs").promises;
const path_1 = require("path");
exports.getPackage = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let PackageData = yield readFile(path_1.join(__dirname, "../package.json")).then((res) => res.toString());
        return Object.assign(Object.assign({}, settings), { package: JSON.parse(PackageData) });
    }
    catch (err) {
        // console.log(err);
    }
    return settings;
});
//# sourceMappingURL=aggregate.js.map