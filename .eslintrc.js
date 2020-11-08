const { tslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(tslint, {
  rules: {
    quotes: 0,
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0
  }
});
