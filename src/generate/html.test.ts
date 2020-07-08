import { buildHtml } from "./html";
import { settings } from "../__mock__";

describe("Test HTML Creating", () => {
	it("Result is an array with the right length", async () => {
		const { html } = await buildHtml(settings).then((r) => r);

		// Assert
		expect(html.length).toBe(49);
	});
	it("Result has a different output", async () => {
		const altSettings = { ...settings, output: "test", destination: "" };
		const { html } = await buildHtml(altSettings).then((r) => r);

		// Assert
		expect(html[0]).toEqual('<link rel="manifest" href="test/manifest.json">');
	});
	it("Result should have an alternative output dir", async () => {
		const altSettings = { ...settings, output: "test", destination: "testje2" };
		const { html } = await buildHtml(altSettings).then((r) => r);

		// Assert
		expect(html[0]).toEqual(
			'<link rel="manifest" href="testje2/manifest.json">'
		);
	});
});
