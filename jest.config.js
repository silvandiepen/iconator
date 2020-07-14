module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["./dist/test/jest.setup.js"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
