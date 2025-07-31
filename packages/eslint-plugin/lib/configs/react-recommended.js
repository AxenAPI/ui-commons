module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    require.resolve('./typescript-recommended'),
    require.resolve('./production-recommended'),
    require.resolve('../rulesets/react'),
  ],
  plugins: ['react-refresh'],
  ignorePatterns: [
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {files: ['*.js?(x)', '*.ts?(x)']},
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
  },
};
