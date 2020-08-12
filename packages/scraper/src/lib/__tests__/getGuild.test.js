const fetchHTML = require('../../utils/fetchHTML')
const getGuild = require('../getGuild')

const guildPage = require('../../../test/stubs/guildPage')
const guildResponse = require('../../../test/stubs/guildResponse.json')

jest.mock('../../utils/fetchHTML')

describe('getGuild', () => {
  it('get guild list information', async () => {
    fetchHTML.mockResolvedValue(guildPage)

    const guild = await getGuild('Gildia PVP')
    expect(guild)
      .toStrictEqual(guildResponse)
  })
})
