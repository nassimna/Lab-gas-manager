module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/no-array-index-key': 1,
    'no-param-reassign': 1,
    'default-param-last': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': [1, { args: 'all' }],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
  },
};
