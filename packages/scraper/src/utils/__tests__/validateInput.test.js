const validateInput = require('../validateInput')

describe('validateInput', () => {
  test('throw error for not value', async () => {
    function callFunction () {
      validateInput()
    }

    expect(callFunction).toThrowError('is required')
  })

  test('throw error for something different than a string', async () => {
    function callFunction () {
      validateInput(1)
    }

    expect(callFunction).toThrowError('have to be a string')
  })

  test('use custom name', async () => {
    function callFunction () {
      validateInput(null, 'CUSTOM NAME')
    }

    expect(callFunction).toThrowError('CUSTOM NAME')
  })
})
