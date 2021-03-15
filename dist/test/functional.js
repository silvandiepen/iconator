#!/usr/bin/env node
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
const Iconator = require("../").default;
const path_1 = require("path");
const testRun = () => __awaiter(void 0, void 0, void 0, function* () {
    let startTime = new Date();
    yield Iconator({
        input: path_1.join(__dirname, "../../src/test/test.png"),
        output: "temp",
    });
    let endTime = new Date();
    return endTime.getTime() - startTime.getTime();
    //   await Iconator({
    //     input: join(__dirname, "../../src/test/test.png"),
    //     sets: ["appleIcon"],
    //   });
});
const testRuns = () => __awaiter(void 0, void 0, void 0, function* () {
    const times = [
        yield testRun(),
        yield testRun(),
        yield testRun(),
        yield testRun(),
        yield testRun(),
        yield testRun(),
        yield testRun(),
    ];
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = sum / times.length || 0;
    const pretty = (time) => Math.round(time / 10) / 100;
    console.log(times.map((time) => (time = pretty(time))));
    console.log(pretty(avg));
});
testRuns();
//# sourceMappingURL=functional.js.map