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
const icons_1 = require("./icons");
const __mock__1 = require("../__mock__");
const { readdir, stat } = require("fs").promises;
const rimraf_1 = __importDefault(require("rimraf"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    rimraf_1.default.sync(".cache");
}));
describe("Icons", () => {
    it("Create a folder", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPath = '../../temp/do"';
        yield icons_1.createFolder(testPath);
        const testDir = yield readdir(testPath, (r) => r);
        // Assert
        expect(testDir).toBeTruthy();
    }));
    it("Don't create a folder", () => __awaiter(void 0, void 0, void 0, function* () {
        const testPath = '../../temp/dont"';
        try {
            yield icons_1.createFolder(testPath);
            yield readdir(testPath + "/test", (r) => r);
        }
        catch (e) {
            expect(e.code).toEqual("ENOENT");
        }
    }));
    it("Loads the source image", () => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield icons_1.loadSourceImage(__mock__1.settings);
        expect(image).toBeTruthy();
    }));
    it("Build One Icon", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const image = yield icons_1.loadSourceImage(__mock__1.settings);
            yield icons_1.processIcon(image, {
                name: "test.jpg",
                width: 100,
                height: 100,
                rotate: false,
                mask: false,
                transparent: false,
            }, __mock__1.settings);
        }
        catch (e) {
            console.log(e);
        }
        const outputFile = yield stat(__mock__1.settings.output + "/test.jpg");
        expect(outputFile.isFile()).toBeTruthy();
    }));
    it("Build one icon - check file", () => __awaiter(void 0, void 0, void 0, function* () {
        const outputFile = yield stat(__mock__1.settings.output + "/test.jpg");
        expect(outputFile.size).toBeGreaterThan(1);
    }));
    xit("Build Icons", () => __awaiter(void 0, void 0, void 0, function* () {
        yield icons_1.buildIcons(__mock__1.settings);
        const outputDir = yield readdir(__mock__1.settings.output);
        expect(outputDir.length).toEqual(59);
    }));
});
//# sourceMappingURL=icons.test.js.map