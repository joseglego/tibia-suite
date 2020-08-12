const fetchHTML = require('../../utils/fetchHTML')
const getWorlds = require('../getWorlds')

const withTournamentPage = require('../../../test/stubs/worldsWithTournamentPage')
const notTournamentPage = require('../../../test/stubs/worldsNotTournamentPage')

const withTournamentResponse = require('../../../test/stubs/worldsWithTournamentResponse.json')
const notTournamentResponse = require('../../../test/stubs/worldsNotTournamentResponse.json')

jest.mock('../../utils/fetchHTML')

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
