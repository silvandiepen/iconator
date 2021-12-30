module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./dist/mjs/test/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
