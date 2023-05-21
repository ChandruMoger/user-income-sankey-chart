module.exports = {
    "roots": ["<rootDir>"],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
    "moduleNameMapper":{
      "^.+\\.(css|less)$": "<rootDir>/config/CSSStub.js"
    },
    "transform": {
      "^.+\\.jsx?$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!d3-scale|d3-interpolate|d3-color|d3-format|d3-time)"
    ],
    "globals": {
      "IS_REACT_ACT_ENVIRONMENT": true
    },
    "collectCoverage": true,
    "clearMocks": true,
    "coverageDirectory": "coverage",
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
  }