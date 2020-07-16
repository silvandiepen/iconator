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
const metafiles_1 = require("./metafiles");
const __mock__1 = require("../__mock__");
const { readdir } = require("fs").promises;
describe("Metafiles", () => {
    it("Create MetaFiles", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPath = 'temp/test/test/test"';
        let newSettings = Object.assign(Object.assign({}, __mock__1.settings), { output: testPath });
        yield metafiles_1.buildMetaFiles(newSettings);
        const testDir = yield readdir(testPath, (r) => r);
        // Assert
        expect(testDir.length).toEqual(4);
    }));
});
//# sourceMappingURL=metafiles.test.js.map