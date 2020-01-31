<p align="center">
    <img alt="DNA" src="logo.svg" width="100">
</p>

<p align="center">
    <strong>DNA</strong> • Progressive Web Components
</p>

<p align="center">
    <a href="https://dna.chialab.io">
        <img alt="Documentation link" src="https://img.shields.io/badge/Docs-dna.chialab.io-lightgrey.svg?style=flat-square">
    </a>
    <a href="https://github.com/chialab/dna">
        <img alt="Source link" src="https://img.shields.io/badge/Source-GitHub-lightgrey.svg?style=flat-square">
    </a>
    <a href="https://www.chialab.it">
        <img alt="Authors link" src="https://img.shields.io/badge/Authors-Chialab-lightgrey.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@chialab/dna">
        <img alt="NPM" src="https://img.shields.io/npm/v/@chialab/dna.svg?style=flat-square">
    </a>
    <a href="https://github.com/chialab/dna/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/npm/l/@chialab/dna.svg?style=flat-square">
    </a>
</p>

---

DNA is a component library which aims to provide a temporarary interface to define Web Components in a simple, light and declarative way until browsers support is complete. Instead of requiring heavy polyfills in order to work in all browsers, DNA's philosophy is to use its template engine to handle Custom Elements life cycle and Shadow DOM flexibility, resulting more efficient, reliable and light.

### Design Web Components

DNA does not introduce any custom pattern for Component definitions, since it is based on the standard Custom Elements specifications, so the life cycle is almost the same, with some helper methods.

### Fast and reliable

In order to be fast, simple and predective, DNA uses a custom template engine. Components automatically re-render when the state change, and only the necessary patches are applied to the DOM tree thanks to an in-place diffing algorithm.

### Interpolation and JSX

If you are familiar with JSX, you can write your templates using the React syntax, but if you prefer to use standard JavaScript you can also use template strings to avoid the build step in your workflow.

### Properties, async render, slots... and more!

DNA comes with a lot of features in a very small (~ 5kb gzipped) package. You can use `<slot>` elements like in Shadow DOM contexts, render async results, observe properties changes and delegate events.

## Get the library

Usage via [unpkg.com](https://unpkg.com/), as UMD package:
```html
<script src="https://unpkg.com/@chialab/dna" type="text/javascript"></script>
<script>
    class MyComponent extends DNA.Component {}

    DNA.define('my-component', MyComponent);
</script>
```

or as ES6 module:

```js
import { Component, define } from 'https://unpkg.com/@chialab/dna?module';

class MyComponent extends Component {}

define('my-component', MyComponent);
```

Install via NPM:
```sh
# NPM
$ npm install @chialab/dna
# Yarn
$ yarn add @chialab/dna
```

```ts
import { Component, define } from '@chialab/dna';

class MyComponent extends Component {}

define('my-component', MyComponent);
```


## Define a Component

This is an example of Component defined via DNA. Please refer to the [documentation](https://dna.chialab.io) for more examples and cases of use.

<details>
    <summary>Expand the code</summary>
<br />

**Define a template**
```html
<template name="hello-component">
    <style scoped>
        :host {
            display: block;
            padding: 10px;
        }

        .message {
            display: flex;
            align-items: center;
        }

        .icon {
            font-size: 50px;
        }
    </style>
    <form>
        <label>What's your name?</label>
        <input type="text" name="name" />
    </form>
    <span class="message">
        <span class="icon">👋🏻</span> Hello {{ name }}
    </span>
</template>
```

**Define the Component**
```ts
import { Component, property, define, render } from '@chialab/dna';

class HelloWorld extends Component {
    @property() // define an observable Component property
    name: string;

    get events() { // define a list of delegated events
        return {
            'input [name="name"]': (ev, target) => {
                this.name = target.value;
            },
        };
    }
}

// link the Component class to a tag
define('hello-world', HelloWorld);

// render the Component
render(document.body, new HelloWorld);
```
</details>

---

## Development

[![Travis status](https://img.shields.io/travis/chialab/dna/3.0.0.svg?style=flat-square)](https://travis-ci.org/chialab/dna)
[![Code coverage](https://img.shields.io/codecov/c/github/chialab/dna/3.0.0.svg?style=flat-square)](https://codecov.io/gh/chialab/dna)
[![Saucelabs](https://badges.herokuapp.com/sauce/chialab-sl-003?labels=none&style=flat-square)](https://saucelabs.com/u/chialab-sl-003)

### Requirements

In order to build and test DNA, the following requirements are needed:
* [NodeJS](https://nodejs.org/) (>= 8.0.0)
* [Yarn](https://yarnpkg.com)
* [RNA](https://github.com/chialab/rna-cli) (>= 3.0.0)

### Build the project

Install the dependencies and run the `build` script:
```
$ yarn install
$ yarn build
```

This will generate the UMD and ESM bundles in the `dist` folder, as well as the declaration file.

### Test the project

Run the `test` script:

```
$ yarn test
```

---

## License

DNA is released under the [MIT](https://github.com/chialab/dna/blob/master/LICENSE) license.
