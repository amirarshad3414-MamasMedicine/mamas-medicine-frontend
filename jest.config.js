const nextJest = require("next/jest").default;

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};

module.exports = createJestConfig(customJestConfig);
