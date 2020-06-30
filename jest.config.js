module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/config/importJestDOM.ts'],
  moduleDirectories: ['node_modules', __dirname],
  testPathIgnorePatterns: ['/node_modules/', '/wparchive/'],
};
