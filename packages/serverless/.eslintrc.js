module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    'standard'
  ],
  plugins: [
    'jest'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
}
