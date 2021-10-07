const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');
const paths = require('./src/config/paths');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: getThemeVariables({
              dark: true,
            }),
            paths: [
              paths.local,
            ],
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
