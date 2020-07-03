module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/tests/utils/setupTests.ts'],
  moduleDirectories: ['node_modules', __dirname],
  testPathIgnorePatterns: ['/node_modules/', '/wparchive/'],
};
