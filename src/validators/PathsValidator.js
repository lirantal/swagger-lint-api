'use strict'

const debug = require('debug')('swagger-lint-api')
const SchemaUtils = require('../utils/SchemaUtils')
const ValidatorsUtils = require('../utils/ValidatorsUtils')

class PathsValidator {
  constructor(schema) {
    this.inputSchema = schema
  }

  has2xxResponses() {
    return this._hasResponseStatusCode(/^2/)
  }

  has4xxResponses() {
    return this._hasResponseStatusCode(/^4/)
  }

  has5xxResponses() {
    return this._hasResponseStatusCode(/^5/)
  }

  _hasResponseStatusCode(statusCodeMatch) {
    const pathsSchema = this.inputSchema.paths
    const result = SchemaUtils.recursivelyFindKeyValueInObjects(
      {
        key: 'responses',
        keyValidator: responsesMap => {
          if (typeof responsesMap !== 'object') {
            return false
          }

          let foundResponse = false
          for (const [responseCode] of Object.entries(responsesMap)) {
            if (responseCode.match(statusCodeMatch)) {
              debug(`found matching response status code: ${responseCode}`)
              foundResponse = true
            }
          }

          return foundResponse
        }
      },
      pathsSchema,
      []
    )

    return ValidatorsUtils.formatResults(result)
  }
}

module.exports = PathsValidator
