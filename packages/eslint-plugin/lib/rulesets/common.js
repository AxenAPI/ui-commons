module.exports = {
  rules: {
    'no-console': 1,
    'no-debugger': 1,
    'max-lines': ['warn', 1023],
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
      },
    ],
    'space-infix-ops': ['error', {int32Hint: false}],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-return-assign': ['error', 'always'],
    'no-sparse-arrays': 'error',
    'no-var': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-template': 'error',
    radix: 'error',
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true,
      },
    ],
    'vars-on-top': 'error',
    'no-extra-bind': 'error',
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    'template-curly-spacing': ['error', 'never'],
  },
};
