/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'react'],
  rules: {
    // 使用三等号
    eqeqeq: 'error',
    // import/export 排序，参考 https://github.com/lydell/eslint-plugin-simple-import-sort#example-configuration
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // 禁用 export default
    'import/no-default-export': 'error',
    // react 组件自闭合
    'react/self-closing-comp': 'error',
  },
  overrides: [
    // 在 index 文件中禁用代码逻辑，只允许使用 import/export 语句
    {
      files: ['**/index.ts', '**/index.tsx', '**/index.js', '**/index.jsx'],
      rules: {
        'no-restricted-syntax': [
          'error',
          { selector: 'VariableDeclaration', message: 'Code logic is not allowed in index file.' },
          { selector: 'FunctionDeclaration', message: 'Code logic is not allowed in index file.' },
          { selector: 'ClassDeclaration', message: 'Code logic is not allowed in index file.' },
        ],
      },
    },
  ],
}
