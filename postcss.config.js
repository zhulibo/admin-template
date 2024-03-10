import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssMixins from 'postcss-mixins';

export default {
  plugins: [
    postcssImport({
      addModulesDirectories: ['node_modules']
    }),
    postcssPresetEnv({
      stage: 0,
      features: {
        'cascade-layers': false // 禁用layer属性转换
      }
    }),
    postcssMixins({
      mixinsFiles: './src/assets/css/mixins.pcss',
    })
  ],
};
