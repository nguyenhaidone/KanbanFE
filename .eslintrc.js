module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
  }
  