const fetchHTML = require('../../../src/utils/fetchHTML')
const getCharacter = require('../../../src/lib/getCharacter')

const charBasicPage = require('../../stubs/charBasicPage')
const charBasicResponse = require('../../stubs/charBasicResponse.json')
const charComplexPage = require('../../stubs/charComplexPage')
const charComplexResponse = require('../../stubs/charComplexResponse.json')

jest.mock('../../../src/utils/fetchHTML')

describe('getCharacter', () => {
  it('get basic character info', async () => {
    fetchHTML.mockResolvedValue(charBasicPage)

    const char = await getCharacter('User')
    expect(char.characterInfo).toStrictEqual(charBasicResponse.characterInfo)
    expect(char.deaths).toBe(undefined)
    expect(char.accountInfo).toBe(undefined)
    expect(char.characters).toBe(undefined)
  })

  describe('get extra info', () => {
    it('get achievements', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.achievements).toStrictEqual(charComplexResponse.achievements)
    })

    it('get deaths', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.deaths).toStrictEqual(charComplexResponse.deaths)
    })

    it('get account info', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.accountInfo).toStrictEqual(charComplexResponse.accountInfo)
    })

    it('get characters', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.characters).toStrictEqual(charComplexResponse.characters)
    })
  })
})
