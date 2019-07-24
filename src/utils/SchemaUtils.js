'use strict'

const _ = require('lodash')

class SchemaUtils {
  static getPaths(obj, parentPath = [], paths = []) {
    if (typeof obj !== 'object') return paths

    for (let prop in obj) {
      const currentPath = [...parentPath, prop]

      paths.push([...currentPath])

      this.getPaths(obj[prop], currentPath, paths)
    }

    return paths
  }

  static findProps(obj, target) {
    return this.getPaths(obj).filter(path => path.includes(target))
  }

  static recursivelyFindKeyValueInObjects(validationSchema, inputSchema, path) {
    let results = []

    const matches = this.findProps(inputSchema, 'description')

    matches.forEach(m => {
      // first get a ref
      let path = ''
      m.forEach(i => {
        path += "['" + i + "']"
      })

      let value = _.get(inputSchema, path)

      const ret = validationSchema.keyValidator(value)

      if (!ret) {
        results.push({
          valid: false,
          path
        })
      }
    })

    return results
  }
}

module.exports = SchemaUtils
