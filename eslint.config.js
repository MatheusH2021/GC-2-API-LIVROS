const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs'
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'space-before-function-paren': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'comma-dangle': ['error', 'never'],
      'no-unused-vars': ['warn', { args: 'none' }],
      'no-console': 'off'
    }
  }
]