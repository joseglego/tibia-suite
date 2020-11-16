const notFoundError = require('../../utils/notFoundError')
const fetchHTML = require('../../utils/fetchHTML')
const getGuild = require('../getGuild')

const guildPage = require('../../../test/stubs/guildPage')
const guildNotFound = require('../../../test/stubs/guildNotFound')
const guildResponse = require('../../../test/stubs/guildResponse.json')

jest.mock('../../utils/fetchHTML')
jest.mock('../../utils/notFoundError')

describe('getGuild', () => {
  it('throw error when guild does not exist', async () => {
    fetchHTML.mockResolvedValue(guildNotFound)

    await getGuild('An Unknown Guild')
    expect(notFoundError).toHaveBeenNthCalledWith(1, 'Guild')
  })

  it('get guild list information', async () => {
    fetchHTML.mockResolvedValue(guildPage)

    const guild = await getGuild('Gildia PVP')
    expect(guild)
      .toStrictEqual(guildResponse)
  })
})
