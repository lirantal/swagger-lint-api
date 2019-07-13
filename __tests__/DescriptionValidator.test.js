const SwaggerSchemaMock = require('./fixtures/swagger-large-description-ok.json')
const {DescriptionValidator} = require('../index')

describe('Description field validator', () => {
  describe('Description Line Breaks', () => {
    test('all description values must have no line breaks in them', () => {
      const validator = new DescriptionValidator(SwaggerSchemaMock)
      const result = validator.descriptionHasNoLineBreaks()

      expect(result).toEqual({valid: true})
    })

    test('should fail if description has a line break in it', () => {
      const mockSwagger = JSON.parse(JSON.stringify(SwaggerSchemaMock))
      mockSwagger['definitions']['Order']['properties']['status']['description'] = 'Order\nstatus'

      const validator = new DescriptionValidator(mockSwagger)
      const result = validator.descriptionHasNoLineBreaks()

      expect(result).toEqual({
        valid: false,
        path: ['definitions', 'Order', 'properties', 'status', 'description']
      })
    })
  })

  describe('Description Tabs', () => {
    test('all description values must have no tabs in them', () => {
      const validator = new DescriptionValidator(SwaggerSchemaMock)
      const result = validator.descriptionHasNoTabs()

      expect(result).toEqual({valid: true})
    })

    test('should fail if description has a tab in it', () => {
      const mockSwagger = JSON.parse(JSON.stringify(SwaggerSchemaMock))
      mockSwagger['definitions']['Order']['properties']['status']['description'] = 'Order\tstatus'

      const validator = new DescriptionValidator(mockSwagger)
      const result = validator.descriptionHasNoTabs()

      expect(result).toEqual({
        valid: false,
        path: ['definitions', 'Order', 'properties', 'status', 'description']
      })
    })
  })

  describe('Description Ends With', () => {
    test('all description values must end with <p></p>', () => {
      const validator = new DescriptionValidator(SwaggerSchemaMock)
      const result = validator.descriptionEndsWithString('<p></p>')

      expect(result).toEqual({valid: true})
    })

    test('description values that dont end with a proper string should fail validation', () => {
      const mockSwagger = JSON.parse(JSON.stringify(SwaggerSchemaMock))
      mockSwagger['paths']['/pet']['post']['description'] = 'some data in string'

      const validator = new DescriptionValidator(mockSwagger)
      const result = validator.descriptionEndsWithString('<p></p>')

      expect(result).toEqual({valid: false, path: ['paths', '/pet', 'post', 'description']})
    })

    test('description values should be found in arrays', () => {
      const mockSwagger = JSON.parse(JSON.stringify(SwaggerSchemaMock))
      mockSwagger['tags'][1]['description'] = 'some data in string'

      const validator = new DescriptionValidator(mockSwagger)
      const result = validator.descriptionEndsWithString('<p></p>')

      expect(result).toEqual({valid: false, path: ['tags', '1', 'description']})
    })
  })

  describe('Description evaluates through custom function', () => {
    test('a description value have should not include a string', () => {
      const validator = new DescriptionValidator(SwaggerSchemaMock)

      const funcFindCustomString = stringMatchText => {
        return stringMatchText.indexOf('Petstore') !== -1
      }

      const result = validator.descriptionCompliesWithFunction(funcFindCustomString)

      expect(result).toEqual({
        valid: false,
        path: ['tags', '0', 'description']
      })
    })
  })
})
