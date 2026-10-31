module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'app.js',
    '**/*.js',
    '**/*.jsx',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    'jest.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};
