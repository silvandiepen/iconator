#!/usr/bin/env node
const Iconator = require("../").default;
import { join } from "path";

const testRun = async () => {
  //   await Iconator({
  //     input: join(__dirname, "../../src/test/test.png"),
  //   });
  await Iconator({
    input: join(__dirname, "../../src/test/test.png"),
    sets: ["appleIcon"],
  });
};

testRun();
