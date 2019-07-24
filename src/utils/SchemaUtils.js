'use strict'

const debug = require('debug')('SchemaUtils')
const _ = require('lodash')

class SchemaUtils {
  /*
  static recursivelyFindKeyValueInObjects(validationSchema, inputSchema, path) {
    if (inputSchema && typeof inputSchema === 'object') {
      for (const [key, value] of Object.entries(inputSchema)) {
        if (key === validationSchema.key) {
          debug(`found a ${validationSchema.key} key`)

          const ret = validationSchema.keyValidator(value)
          if (ret) {
            debug(`key ${validationSchema.key} is valid in path: ${path}`)
          } else {
            debug(`key ${validationSchema.key} is invalid in path: ${path}`)
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
  */

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

    /*
    function getPaths(obj, parentPath = [], paths = []) {
      if(typeof obj !== "object") return paths;

      for(let prop in obj){
          const currentPath = [...parentPath, prop];

          paths.push([...currentPath]);

          getPaths(obj[prop], currentPath, paths);
      }

      return paths;
    }
    */
    /*
    function findProps(obj, target) {
      return getPaths(obj).filter(path => path.includes(target));
    }
    */

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
