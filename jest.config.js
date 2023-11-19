/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.ts", "!src/inc/constants.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
