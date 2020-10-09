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

You can configure the options of the plugin by passing an `option` object.

- `TODO`

For example add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const cracoSwcPlugin = require("craco-swc");

module.exports = {
  plugins: [{ plugin: cracoSwcPlugin, options: {} }],
};
```

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
