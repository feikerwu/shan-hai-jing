module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'xo',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 禁止出现未使用过的变量
    'no-unused-vars': 'error',

    // 禁用未声明的变量
    'no-undef': 'error',
  },
};
