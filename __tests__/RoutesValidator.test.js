const SwaggerSchemaMock = require('./fixtures/swagger-large-description-ok.json')
const {PathsValidator} = require('../index')

describe('Paths validator', () => {
  describe('Path responses', () => {
    test('All paths must have user-caused errors defined', () => {
      const validator = new PathsValidator(SwaggerSchemaMock)
      const result = validator.has4xxResponses()

      expect(result).toEqual({valid: true})
    })

    test('All paths must have server success routes defined', () => {
      const validator = new PathsValidator(SwaggerSchemaMock)
      const result = validator.has2xxResponses()

      expect(result).toEqual({valid: false, path: ['/pet', 'post', 'responses']})
    })
  })
})
