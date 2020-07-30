const fetchHTML = require('../../../src/utils/fetchHTML')
const getWorlds = require('../../../src/lib/getWorlds')

const withTournamentPage = require('../../stubs/worldsWithTournamentPage')
const notTournamentPage = require('../../stubs/worldsNotTournamentPage')

const withTournamentResponse = require('../../stubs/worldsWithTournamentResponse.json')
const notTournamentResponse = require('../../stubs/worldsNotTournamentResponse.json')

jest.mock('../../../src/utils/fetchHTML')

describe('getWorlds', () => {
  it('get worlds list information with tournamentworlds', async () => {
    fetchHTML.mockResolvedValue(withTournamentPage)

    const worlds = await getWorlds()
    expect(worlds).toStrictEqual(withTournamentResponse)
  })

  it('get worlds list information without tournamentworlds', async () => {
    fetchHTML.mockResolvedValue(notTournamentPage)

    const worlds = await getWorlds()
    expect(worlds).toStrictEqual(notTournamentResponse)
  })
})
