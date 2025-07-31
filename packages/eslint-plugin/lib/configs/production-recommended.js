module.exports = {
  extends: [
    require.resolve('./production-essential'),
  ],
  rules: {
    'no-console': 1,
    'no-constant-condition': 1,
  },
};
