const notFoundError = require('../notFoundError')

describe('notFoundError', () => {
  test('use default name', async () => {
    function callFunction () {
      notFoundError();
    }    
    
    expect(callFunction).toThrowError("Couldn't find it")
  })

  test('use custom name', async () => {
    function callFunction () {
      notFoundError('CUSTOM NAME')
    }    

    expect(callFunction).toThrowError("Couldn't find CUSTOM NAME")
  })
})
