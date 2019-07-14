'use strict'

const SchemaUtils = require('../utils/SchemaUtils')
const ValidatorsUtils = require('../utils/ValidatorsUtils')

class DescriptionValidator {
  constructor(schema) {
    this.inputSchema = schema
  }

  descriptionHasNoLineBreaks() {
    const result = SchemaUtils.recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return !value.match(/\n/g)
        }
      },
      this.inputSchema,
      []
    )

    return ValidatorsUtils.formatResults(result)
  }

  descriptionHasNoTabs() {
    const result = SchemaUtils.recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return !value.match(/\t/g)
        }
      },
      this.inputSchema,
      []
    )

    return ValidatorsUtils.formatResults(result)
  }

  descriptionCompliesWithFunction(customFunction) {
    const result = SchemaUtils.recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: customFunction
      },
      this.inputSchema,
      []
    )

    return ValidatorsUtils.formatResults(result)
  }

  descriptionEndsWithString(str) {
    const result = SchemaUtils.recursivelyFindKeyValueInObjects(
      {
        key: 'description',
        keyValidator: value => {
          return value && typeof value === 'string' && value.endsWith(str)
        }
      },
      this.inputSchema,
      []
    )

    return ValidatorsUtils.formatResults(result)
  }
}

module.exports = DescriptionValidator
