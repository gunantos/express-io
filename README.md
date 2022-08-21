[![APP KITA Logo](https://github.com/gunantos/express-io/blob/main/logo.png)](http://app-kita.com/)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org).

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
const expressio = require('express-io')
const app = expressio()
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[Working with the npm registry](https://docs.github.com/articles/configuring-npm-for-use-with-github-package-registry/):

```console
$ npm install @gunantos/express-io@0.0.1
```

Install via package.json:
```package 
"@gunantos/express-io": "0.0.1"
```

## Features

  * Robust routing

## Quick Start


  Install dependencies:

```console
$ npm install @gunantos/express-io@0.0.1
```

  create src/index.js
  ```nodejs
  const expressio = require('express-io')
  const app = expressio();
  expressio.start()
  ```

  Start the server:

```console
$ npm start
```

  View the website at: http://localhost:5000

## Contributing

See the [Contributing Guide](Contributing.md) for more technical details on contributing.

### Security Issues

If you discover a security vulnerability in express-io, please see [Security Policies and Procedures](Security.md).

### Running Tests

To run the test suite, first install the dependencies, then run `npm test`:

```console
$ npm install
$ npm test
```

## People

[List of all contributors](https://github.com/gunantos/express-io/graphs/contributors)

## License

  [MIT](LICENSE)

[npm-downloads-image]: https://badgen.net/github/dependents-pkg/gunantos/express-io
[npm-install-size-image]: https://badgen.net/github/license/gunantos/express-io
[npm-version-image]: https://badgen.net/github/tag/gunantos/express-io
[npm-url]: https://github.com/gunantos/express-io/packages/1604552
[npm-install-size-url]: https://packagephobia.com/result?p=express-io
[npm-downloads-url]: https://npmcharts.com/compare/express-io?minimal=true