const fetchHTML = require('../../utils/fetchHTML')
const notFoundError = require('../../utils/notFoundError')
const getCharacter = require('../getCharacter')

const charBasicPage = require('../../../test/stubs/charBasicPage')
const chartNotFound = require('../../../test/stubs/charNotFound')
const charBasicResponse = require('../../../test/stubs/charBasicResponse.json')
const charComplexPage = require('../../../test/stubs/charComplexPage')
const charComplexResponse = require('../../../test/stubs/charComplexResponse.json')

jest.mock('../../utils/fetchHTML')
jest.mock('../../utils/notFoundError')

describe('getCharacter', () => {
  it('get basic character info', async () => {
    fetchHTML.mockResolvedValue(charBasicPage)

    const char = await getCharacter('User')
    expect(char.characterInfo).toStrictEqual(charBasicResponse.characterInfo)
    expect(char.deaths).toBe(undefined)
    expect(char.accountInfo).toBe(undefined)
    expect(char.characters).toBe(undefined)
  })

  it('throw error when character does not exist', async () => {
    fetchHTML.mockResolvedValue(chartNotFound)

    await getCharacter('An Unknown Character')
    expect(notFoundError).toHaveBeenNthCalledWith(1, 'Character')
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
