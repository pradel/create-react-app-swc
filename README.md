# craco-swc

Use [swc](https://swc.rs/) with [create-react-app](https://create-react-app.dev/) for faster compilation 🚀.

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
const cracoSwcPlugin = require("craco-swc");

module.exports = {
  plugins: [{ plugin: cracoSwcPlugin }],
};
```

## Configuration

You can configure the options of the plugin by passing an `options` object.

- `swcLoaderOptions`: customise the options passed down to the swc loader.

For example add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const cracoSwcPlugin = require("craco-swc");

module.exports = {
  plugins: [
    {
      plugin: cracoSwcPlugin,
      options: {
        swcLoaderOptions: {
          // Take a look at https://swc.rs/docs/configuring-swc#jsc to see the list of available options
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
