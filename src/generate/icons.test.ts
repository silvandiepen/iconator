import { createDir } from "@sil/tools";

import { buildIcons, loadSourceImage, processIcon } from "./icons";
import { settings } from "../__mock__";
const { readdir, stat } = require("fs").promises;
import { sync } from "rimraf";

beforeEach(async () => {
  sync(".cache");
});

describe("Icons", () => {
  it("Create a folder", async () => {
    const testPath = '../../temp/do"';
    await createDir(testPath);
    const testDir = await readdir(testPath, (r) => r);

    // Assert
    expect(testDir).toBeTruthy();
  });

  it("Don't create a folder", async () => {
    const testPath = '../../temp/dont"';
    try {
      await createDir(testPath);
      await readdir(testPath + "/test", (r) => r);
    } catch (e: any) {
      expect(e.code || "").toEqual("ENOENT");
    }
  });

  it("Loads the source image", async () => {
    const image = await loadSourceImage(settings);
    expect(image).toBeTruthy();
  });

  it("Build One Icon", async () => {
    try {
      const image = await loadSourceImage(settings);

      await processIcon(
        image,
        {
          name: "test.jpg",
          width: 100,
          height: 100,
          rotate: false,
          mask: false,
          transparent: false,
        },
        settings
      );
    } catch (e) {
      console.log(e);
    }
    const outputFile = await stat(settings.output + "/test.jpg");
    expect(outputFile.isFile()).toBeTruthy();
  });

  it("Build one icon - check file", async () => {
    const outputFile = await stat(settings.output + "/test.jpg");
    expect(outputFile.size).toBeGreaterThan(1);
  });
  xit("Build Icons", async () => {
    await buildIcons(settings);
    const outputDir = await readdir(settings.output);
    expect(outputDir.length).toEqual(59);
  });
});
