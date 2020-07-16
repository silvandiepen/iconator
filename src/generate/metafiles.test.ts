import { buildMetaFiles } from "./metafiles";
import { settings } from "../__mock__";
const { readdir } = require("fs").promises;

describe("Metafiles", () => {
	it("Create MetaFiles", async () => {
		const testPath = 'temp/test/test/test"';

		let newSettings = {
			...settings,
			output: testPath,
		};

		await buildMetaFiles(newSettings);
		const testDir = await readdir(testPath, (r) => r);

		// Assert
		expect(testDir.length).toEqual(4);
	});
});
