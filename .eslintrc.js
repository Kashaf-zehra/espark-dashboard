module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'next',
    'prettier',
  ],
  plugins: [
    'eslint-plugin-prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'tailwindcss',
  ],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-const': ['error'],
    'no-undef': ['error', { typeof: true }],
  },
  globals: {
    Set: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
