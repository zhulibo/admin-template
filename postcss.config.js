const postcssPresetEnv = require('postcss-preset-env')
const postcssMixins = require('postcss-mixins')

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0
    }),
    postcssMixins({
      mixinsFiles: './src/assets/css/mixins.pcss',
    })
  ]
}
