# 🚀 create-react-app-swc 🚀

Use [swc](https://swc.rs/) in your [create-react-app](https://create-react-app.dev/) for faster compilation, development and tests.

## Features

- javascript / typescript support
- Replace babel-loader with swc during development
- Replace babel-loader with swc for faster build time
- Replace babel with swc when running jest tests

## Getting started

Follow the [guide](https://github.com/pradel/create-react-app-swc/blob/main/packages/craco-swc/README.md) to setup your project.

## FAQ

### Why is it faster?

Internally create-react-app use babel to compile the javascript / typescript files of your application. By using craco-swc, you use the [swc](https://swc.rs/) compiler to compile your app instead of babel. swc is a super fast javascript / typescript compiler written in Rust.

### What is craco and why do I need it?

[craco](https://github.com/gsoft-inc/craco) (**C**reate **R**eact **A**pp **C**onfiguration **O**verride) is an easy and comprehensible configuration layer for create-react-app. By using craco you can customise the create-react-app configuration without ejecting.

### What are the differences with create-react-app?

- Since babel is not used, you won't be able to use the babel plugins (eg: `babel-plugin-macros`, `babel-plugin-transform-react-remove-prop-types`, ...).
- No flow support

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
