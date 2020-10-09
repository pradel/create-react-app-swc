# 🚀 craco-swc 🚀

Use [swc](https://swc.rs/) in your [create-react-app](https://create-react-app.dev/) with [craco](https://github.com/gsoft-inc/craco) for faster compilation, development and tests.

## Features

- Replace babel-loader with swc during development
- Replace babel-loader with swc for faster build time
- Use swc when running jest

## Installation

Run the following command to install `craco-swc` in your project:

```sh
yarn add --dev craco-swc @craco/craco

# OR

npm install --save-dev craco-swc @craco/craco
```

## Usage

Add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const CracoSwcPlugin = require("craco-swc");

module.exports = {
  plugins: [{ plugin: CracoSwcPlugin }],
};
```

## Configuration

If your project contains a `.swcrc` file, it will be used by the `swc` loader configuration.
Take a look at https://swc.rs/docs/configuring-swc#jsc to see the list of available options.

You can also configure the options of the plugin by passing an `options` object.

- `swcLoaderOptions`: customise the options passed down to the `swc` loader. _Note: This will be used only by webpack_

For example add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const CracoSwcPlugin = require("craco-swc");

module.exports = {
  plugins: [
    {
      plugin: CracoSwcPlugin,
      options: {
        swcLoaderOptions: {
          jsc: {
            externalHelpers: true,
            target: "es2015",
            parser: {
              syntax: "ecmascript",
              jsx: true,
              dynamicImport: true,
              exportDefaultFrom: true,
            },
          },
        },
      },
    },
  ],
};
```

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
