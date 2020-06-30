module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', __dirname],
  testPathIgnorePatterns: ['/node_modules/', '/wparchive/'],
};
