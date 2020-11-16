const nodeFetch = require('node-fetch')
const fetchHTML = require('../../../src/utils/fetchHTML')

jest.mock('node-fetch')

describe('fetchHTML', () => {
  test('throw error when does not have connection', async () => {
    nodeFetch.mockResolvedValue({})
    await expect(fetchHTML('www.example.com'))
      .rejects
      .toThrow('There was a problem with the conection.')
  })

  test('get HTML string from url', async () => {
    nodeFetch.mockResolvedValue({ text: jest.fn(() => '<html><body><h1>Examole</h1></body>/html>') })
    const expectedBody = '<html><body><h1>Examole</h1></body>/html>'
    const body = await fetchHTML('www.example.com')

    expect(body).toBe(expectedBody)
  })
})
