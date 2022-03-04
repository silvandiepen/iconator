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
const html_1 = require("./html");
const __mock__1 = require("../__mock__");
describe("Test HTML Creating", () => {
    it("Result is an array with the right length", () => __awaiter(void 0, void 0, void 0, function* () {
        const { html } = yield (0, html_1.buildHtml)(__mock__1.settings).then((r) => r);
        // Assert
        expect(html.length).toBe(50);
    }));
    it("Result has a different output", () => __awaiter(void 0, void 0, void 0, function* () {
        const altSettings = Object.assign(Object.assign({}, __mock__1.settings), { output: "test", destination: "" });
        const { html } = yield (0, html_1.buildHtml)(altSettings).then((r) => r);
        // Assert
        expect(html[0]).toEqual('<link rel="manifest" href="/test/manifest.json">');
    }));
    it("Result should have an alternative output dir", () => __awaiter(void 0, void 0, void 0, function* () {
        const altSettings = Object.assign(Object.assign({}, __mock__1.settings), { output: "test", destination: "test-destination" });
        const { html } = yield (0, html_1.buildHtml)(altSettings).then((r) => r);
        // Assert
        expect(html[0]).toEqual('<link rel="manifest" href="/test-destination/manifest.json">');
    }));
    it("Test if the url is being added rightfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const altSettings = Object.assign(Object.assign({}, __mock__1.settings), { url: "https://testdomain.com", output: "test" });
        const { html } = yield (0, html_1.buildHtml)(altSettings).then((r) => r);
        // Assert
        expect(html[0]).toEqual('<link rel="manifest" href="https://testdomain.com/test/manifest.json">');
    }));
});
//# sourceMappingURL=html.test.js.map