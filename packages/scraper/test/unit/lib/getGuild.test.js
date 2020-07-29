const fetchHTML = require('../../../src/utils/fetchHTML')
const getGuild = require('../../../src/lib/getGuild')

const guildPage = require('../../stubs/guildPage')
const guildResponse = require('../../stubs/guildResponse.json')

jest.mock('../../../src/utils/fetchHTML')

describe('getGuild', () => {
  it('get guild list information', async () => {
    fetchHTML.mockResolvedValue(guildPage)

    const guild = await getGuild('Gildia PVP')
    expect(guild)
      .toStrictEqual(guildResponse)
  })
})
