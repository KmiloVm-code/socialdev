export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    '!**/node_modules/**',
  ],
};
