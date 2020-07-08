import { createFolder, buildIcon, buildIcons } from "./icons";
import { settings } from "../__mock__";
const { readdir, stat } = require("fs").promises;

describe("Icons", () => {
	it("Create a folder", async () => {
		const testPath = 'temp/test/test/test"';
		await createFolder(testPath);
		const testDir = await readdir(testPath, (r) => r);

		// Assert
		expect(testDir).toBeTruthy();
	});
	it("Don't create a folder", async () => {
		const testPath = 'temp/test/test/test"';
		try {
			await createFolder(testPath);
			await readdir(testPath + "/test", (r) => r);
		} catch (e) {
			expect(e.code).toEqual("ENOENT");
		}
	});
	it("Build One Icon", async () => {
		await buildIcon(
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
		const outputFile = await stat(settings.output + "/test.jpg");
		expect(outputFile.isFile()).toBeTruthy();
	});
	it("Build one icon - check file", async () => {
		const outputFile = await stat(settings.output + "/test.jpg");
		expect(outputFile.size).toBeGreaterThan(1);
	});
	it("Build Icons", async () => {
		await buildIcons(settings);
		const outputDir = await readdir(settings.output);
		expect(outputDir.length).toEqual(59);
	});
});
