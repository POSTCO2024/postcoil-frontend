// @ts-nocheck
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0,
    }),
  ],
};