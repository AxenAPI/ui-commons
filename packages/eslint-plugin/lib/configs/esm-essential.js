module.exports = {
  plugins: [
    'eslint-plugin-import',
  ],
  extends: [
    require.resolve('./essential'),
    require.resolve('../rulesets/import'),
  ],
};
