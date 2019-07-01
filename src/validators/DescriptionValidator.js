'use strict'

const debug = require('debug')('swagger-lint')

class DescriptionValidator {
  constructor(schema) {
    this.inputSchema = schema
  }

  descriptionHasNoLineBreaks() {
    const result = this._recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return !value.match(/\n/g)
        }
      },
      this.inputSchema,
      []
    )

    return this._formatResult(result)
  }

  descriptionHasNoTabs() {
    const result = this._recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return !value.match(/\t/g)
        }
      },
      this.inputSchema,
      []
    )

    return this._formatResult(result)
  }

  // TODO
  descriptionCompliesWithFunction(callback) {}

  descriptionEndsWithString(str) {
    const result = this._recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return value && typeof value === 'string' && value.endsWith(str)
        }
      },
      this.inputSchema,
      []
    )

    return this._formatResult(result)
  }

  _recursivelyFindKeyValueInObjects(validationSchema, inputSchema, path) {
    if (inputSchema && typeof inputSchema === 'object') {
      for (const [key, value] of Object.entries(inputSchema)) {
        if (key === validationSchema.key) {
          debug(`found a ${validationSchema.key} key`)

          const ret = validationSchema.keyValidator(value)
          if (ret) {
            debug(`description key is valid in path: ${path}`)
          } else {
            debug(`description key is invalid in path: ${path}`)
            return {
              valid: false,
              path: path.concat(key)
            }
          }
        } else {
          debug(`traversing deeper for key: ${validationSchema.key}`)
          path.push(key)
          const ret = this._recursivelyFindKeyValueInObjects(validationSchema, value, path)
          if (ret) {
            return ret
          } else {
            path.pop()
          }
        }
      }
    }
  }

  _formatResult(result) {
    if (!result) {
      return {
        valid: true
      }
    }

    return result
  }
}

module.exports = DescriptionValidator
