'use strict'

class ValidatorUtils {
  static formatResults(result) {
    if (!result) {
      return {
        valid: true
      }
    }

    return result
  }
}

module.exports = ValidatorUtils
