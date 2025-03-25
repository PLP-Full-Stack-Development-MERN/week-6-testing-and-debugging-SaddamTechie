// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // Required for React DOM testing
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Transform JS/JSX files with Babel
    },
  };