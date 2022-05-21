module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    // Best Practices
    'class-methods-use-this': 'warn',
    'no-lone-blocks': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-useless-concat': 'error',
    'vars-on-top': 'error',
    'yoda': 'error',

    // Variables
    'no-use-before-define': 'error',

    // Stylistic Issues
    'comma-dangle': ['warn', 'only-multiline'],
    'eol-last': 'warn',
    'function-paren-newline': 'warn',
    'implicit-arrow-linebreak': 'error',
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'max-depth': ['warn', { max: 6 }],
    'max-nested-callbacks': ['warn', { max: 4 }],
    'max-params': ['warn', { max: 5 }],
    'max-statements-per-line': 'error',
    'new-cap': [
      'warn',
      {
        newIsCap: true,
        capIsNew: false,
        properties: false,
      },
    ],
    'no-mixed-operators': 'warn',
    'no-multi-assign': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-nested-ternary': 'warn',
    'no-trailing-spaces': 'warn',
    'no-whitespace-before-property': 'error',
    'one-var-declaration-per-line': 'warn',
    'quote-props': ['error', 'consistent-as-needed'],
    'semi': ['warn', 'always'],
    'semi-spacing': 'error',
    'semi-style': 'error',
    'space-before-function-paren': 'off',
    'switch-colon-spacing': 'error',

    // ECMAScript 6
    'arrow-spacing': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'error',
    'prefer-const': 'warn',
  },
};
