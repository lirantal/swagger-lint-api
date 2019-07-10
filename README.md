<p align="center"><h1 align="center">
  swagger-lint-api
</h1>

<p align="center">
  Linter for a Swagger JSON API spec
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/swagger-lint-api"><img src="https://badgen.net/npm/v/swagger-lint-api" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/swagger-lint-api"><img src="https://badgen.net/npm/license/swagger-lint-api" alt="license"/></a>
  <a href="https://www.npmjs.org/package/swagger-lint-api"><img src="https://badgen.net/npm/dt/swagger-lint-api" alt="downloads"/></a>
  <a href="https://travis-ci.org/lirantal/swagger-lint-api"><img src="https://badgen.net/travis/lirantal/swagger-lint-api" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/swagger-lint-api"><img src="https://badgen.net/codecov/c/github/lirantal/swagger-lint-api" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/swagger-lint-api"><img src="https://snyk.io/test/github/lirantal/swagger-lint-api/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Security Responsible Disclosure" /></a>
</p>

# About

swagger-lint-api

Linter for a Swagger JSON API spec

# Install

```bash
npm install --save swagger-lint-api
```

# Usage

The library exposes validators to be used with an OpenAPI / Swagger JSON-formatted schema:

1. Require the library
2. Instantiate a new validator based on a schema
3. Invoke validator methods to validate the schema

```js
const {DescriptionValidator} = require('swagger-lint-api')

const swaggerJSON = {}
const validator = new DescriptionValidator(swaggerJSON)

// Available validators to use:
validator.descriptionHasNoLineBreaks()
validator.descriptionHasNoTabs()
validator.descriptionEndsWithString()
```

# Example

Using a JSON schema file you want to validate:

```js
const {DescriptionValidator} = require('swagger-lint-api')

// since it's just a JSON document we can require it into a variable
// and pass on to the constructor call
const mySwaggerSchema = require('./swagger-schema.json')
const validator = new DescriptionValidator(mySwaggerSchema)

// validate
const result = validator.descriptionHasNoLineBreaks()
// check result.valid being true or false
```

Inline JSON validation:

```js
const {DescriptionValidator} = require('swagger-lint-api')

const someJSON = {description: 'this \n has \nline-breaks'}
const validator = new DescriptionValidator(someJSON)

// validate for line breaks
const result = validator.descriptionHasNoLineBreaks()
// result.valid will be false
```

# Contributing

Please consult [CONTIRBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**swagger-lint-api** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
