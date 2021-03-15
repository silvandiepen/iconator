#!/usr/bin/env node

const Iconator = require("../").default;
import { join } from "path";

const testRun = async () => {
  let startTime = new Date();

  await Iconator({
    input: join(__dirname, "../../src/test/test.png"),
    output: "temp",
  });

  let endTime = new Date();

  return endTime.getTime() - startTime.getTime();

  //   await Iconator({
  //     input: join(__dirname, "../../src/test/test.png"),
  //     sets: ["appleIcon"],
  //   });
};

const testRuns = async () => {
  const times = [
    await testRun(),
    await testRun(),
    await testRun(),
    await testRun(),
    await testRun(),
    await testRun(),
    await testRun(),
  ];

  const sum = times.reduce((a, b) => a + b, 0);
  const avg = sum / times.length || 0;

  const pretty = (time: number): number => Math.round(time / 10) / 100;

  console.log(times.map((time) => (time = pretty(time))));
  console.log(pretty(avg));
};

testRuns();
