'use strict'

const debug = require('debug')('SchemaUtils')

class SchemaUtils {
  static recursivelyFindKeyValueInObjects(validationSchema, inputSchema, path) {
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
          const ret = SchemaUtils.recursivelyFindKeyValueInObjects(validationSchema, value, path)
          if (ret) {
            return ret
          } else {
            path.pop()
          }
        }
      }
    }
  }
}

module.exports = SchemaUtils
