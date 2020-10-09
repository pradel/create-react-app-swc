const fs = require("fs");
const { loaderByName, removeLoaders, addAfterLoader } = require("@craco/craco");

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

    // add swc-loader
    addAfterLoader(webpackConfig, loaderByName("babel-loader"), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: require.resolve("swc-loader"),
      options:
        pluginOptions && pluginOptions.swcLoaderOptions
          ? pluginOptions.swcLoaderOptions
          : {
              jsc: {
                externalHelpers: true,
                target: "es2015",
                parser: {
                  syntax: useTypeScript ? "typescript" : "ecmascript",
                  jsx: true,
                },
              },
            },
    });

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName("babel-loader"));

    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the swc jest loader
   */
  overrideJestConfig: ({
    jestConfig,
    pluginOptions,
    context: { env, paths, resolve, rootDir },
  }) => {
    // Replace babel transform with swc
    const key = Object.keys(jestConfig.transform)[0];
    // TODO find a way to pass options directly to the plugin without having to use a .swcrc
    jestConfig.transform[key] = [require.resolve("@swc/jest")];

    return jestConfig;
  },
};
