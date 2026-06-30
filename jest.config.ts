import type { Config } from "jest";
// next/jest.js automatically sets up the recommended Jest configuration under the hood
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true, // clear mocks before each test
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/build/**",
    "!**/next-env.d.ts",
    "!**/jest.config.ts",
    "!**/jest.setup.ts",
    "!**/__test__/**",
    "!**/coverage/**",
    "!**/public/**",
    "!**/next.config.ts",
    "!**/app/layout.tsx",
    "!**/app/**",
    "!**/types/**",
  ],
  // map the paths to the components
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default createJestConfig(config);
