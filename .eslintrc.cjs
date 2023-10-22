/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  'rules': {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off' // 阻止使用@ts-ignore时的警告
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
