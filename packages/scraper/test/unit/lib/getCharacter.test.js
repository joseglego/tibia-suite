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
    it('get detailed guild membership', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.characterInfo.guildMembership).toStrictEqual(charComplexResponse.characterInfo.guildMembership)
    })

    it('get detailed list of houses', async () => {
      fetchHTML.mockResolvedValue(charComplexPage)
      const char = await getCharacter('Momzo')

      expect(char.characterInfo.houses[0]).toStrictEqual(charComplexResponse.characterInfo.houses[0])
      expect(char.characterInfo.houses[1]).toStrictEqual(charComplexResponse.characterInfo.houses[1])
      expect(char.characterInfo.houses[2]).toStrictEqual(charComplexResponse.characterInfo.houses[2])
    })

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
