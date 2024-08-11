/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true, 
  extends: ["@postcoil/eslint-config"], 
  ignorePatterns: [".eslintrc.cjs", "dist/**/*", "postcss.config.cjs"],
  parserOptions: {
    tsconfigRootDir: __dirname, 
    project: "./tsconfig.json", 
  },
};