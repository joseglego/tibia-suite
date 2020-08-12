const fetchHTML = require('../../../src/utils/fetchHTML')

jest.mock('node-fetch', () => jest.fn(() => ({ text: jest.fn(() => '<html><body><h1>Examole</h1></body>/html>') })))

describe('fetchHTML', () => {
  test('get HTML string from url', async () => {
    const expectedBody = '<html><body><h1>Examole</h1></body>/html>'
    const body = await fetchHTML('www.example.com')

    expect(body).toBe(expectedBody)
  })
})
