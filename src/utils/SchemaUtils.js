'use strict'

const _ = require('lodash')

class SchemaUtils {
  static getPaths(obj, parentPath = [], paths = []) {
    if (typeof obj !== 'object') return paths

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const currentPath = [...parentPath, `[${i}]`]

        paths.push([...currentPath])

        this.getPaths(obj[i], currentPath, paths)
      }
    } else {
      for (let prop in obj) {
        const currentPath = [...parentPath, prop]

        paths.push([...currentPath])

        this.getPaths(obj[prop], currentPath, paths)
      }
    }

    return paths
  }

  static findProps(obj, target) {
    return this.getPaths(obj).filter(paths => paths.slice(-1).includes(target))
  }

  static recursivelyFindKeyValueInObjects(validationSchema, inputSchema, path) {
    let results = []

    const matches = this.findProps(inputSchema, 'description')

    matches.forEach(m => {
      // first get a ref
      let path = ''
      m.forEach(i => {
        if (i.charAt(0) === '[') {
          path += i
        } else {
          path += "['" + i + "']"
        }
      })

      let value = _.get(inputSchema, path)

      const ret = validationSchema.keyValidator(value)

      if (!ret) {
        results.push({
          valid: false,
          path: m
        })
      }
    })

    return results
  }
}

module.exports = SchemaUtils
