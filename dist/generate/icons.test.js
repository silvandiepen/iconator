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
const icons_1 = require("./icons");
const __mock__1 = require("../__mock__");
const { readdir, stat } = require("fs").promises;
describe("Icons", () => {
    it("Create a folder", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPath = 'temp/test/test/test"';
        yield icons_1.createFolder(testPath);
        const testDir = yield readdir(testPath, (r) => r);
        // Assert
        expect(testDir).toEqual([]);
    }));
    it("Don't create a folder", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPath = 'temp/test/test/test"';
        try {
            yield icons_1.createFolder(testPath);
            yield readdir(testPath + "/test", (r) => r);
        }
        catch (e) {
            expect(e.code).toEqual("ENOENT");
        }
    }));
    it("Build One Icon", () => __awaiter(void 0, void 0, void 0, function* () {
        yield icons_1.buildIcon({
            name: "test.jpg",
            width: 100,
            height: 100,
            rotate: false,
            mask: false,
            transparent: false,
        }, __mock__1.settings);
        const outputFile = yield stat(__mock__1.settings.output + "/test.jpg");
        expect(outputFile.isFile()).toBeTruthy();
    }));
    it("Build one icon - check file", () => __awaiter(void 0, void 0, void 0, function* () {
        const outputFile = yield stat(__mock__1.settings.output + "/test.jpg");
        expect(outputFile.size).toBeGreaterThan(1);
    }));
    it("Build Icons", () => __awaiter(void 0, void 0, void 0, function* () {
        yield icons_1.buildIcons(__mock__1.settings);
        const outputDir = yield readdir(__mock__1.settings.output);
        expect(outputDir.length).toEqual(59);
    }));
});
//# sourceMappingURL=icons.test.js.map