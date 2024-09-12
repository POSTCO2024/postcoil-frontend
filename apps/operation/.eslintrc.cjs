/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@postcoil/eslint-config'],
  ignorePatterns: ['.eslintrc.cjs', 'public/js/Factory.js', './src/pages/fo002/ThreeDMonitoring.tsx'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
