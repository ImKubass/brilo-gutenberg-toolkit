const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    libraryTarget: 'commonjs-module',
  },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@blocks': path.resolve(__dirname, 'src/blocks/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
    },
  },
};
