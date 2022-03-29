const path = require('path');
const fs = require('fs');
const { loaderByName, removeLoaders, addAfterLoader } = require('@craco/craco');

module.exports = {
  /**
   * To process the js/ts files we replace the babel-loader with the swc-loader
   */
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths },
  }) => {
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const appSwcConfig = path.resolve(paths.appPath, '.swcrc');
    const useSwcConfig = fs.existsSync(appSwcConfig);

    // add swc-loader
    addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: require.resolve('swc-loader'),
      options:
        pluginOptions && pluginOptions.swcLoaderOptions
          ? pluginOptions.swcLoaderOptions
          : useSwcConfig
          ? // If there is an .swcrc file at the root of the project we pass undefined
            // That way swc will use the .swcrc config
            undefined
          : {
              jsc: {
                target: 'es2015',
                externalHelpers: true,
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
                parser: useTypeScript
                  ? {
                      syntax: 'typescript',
                      tsx: true,
                      dynamicImport: true,
                    }
                  : {
                      syntax: 'ecmascript',
                      jsx: true,
                      dynamicImport: true,
                    },
              },
            },
    });

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName('babel-loader'));

    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the swc jest loader
   */
  overrideJestConfig: ({ jestConfig, pluginOptions, context: { paths } }) => {
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const appSwcConfig = path.resolve(paths.appPath, '.swcrc');
    const useSwcConfig = fs.existsSync(appSwcConfig);
    const swcConfig = useSwcConfig
      ? JSON.parse(fs.readFileSync(appSwcConfig, 'utf-8'))
      : null;

    // Replace babel transform with swc
    const key = Object.keys(jestConfig.transform)[0];
    // TODO find a way to pass options directly to the plugin without having to use a .swcrc
    jestConfig.transform[key] = [
      require.resolve(
        '@swc/jest',
        swcConfig
          ? swcConfig
          : {
              sourceMaps: true,
              jsc: {
                target: 'es2021',
                externalHelpers: true,
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
                parser: useTypeScript
                  ? {
                      syntax: 'typescript',
                      tsx: true,
                      dynamicImport: true,
                    }
                  : {
                      syntax: 'ecmascript',
                      jsx: true,
                      dynamicImport: true,
                    },
              },
            }
      ),
    ];

    return jestConfig;
  },
};
