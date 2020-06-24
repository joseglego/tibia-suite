const tabletojson = require('tabletojson').Tabletojson

const getWorlds = require('../../../src/lib/getWorlds')
const worldsMock = require('../../stubs/worlds.json')
const worldsWithoutTournamentMock = require('../../stubs/worldsWithoutTournament.json')
jest.mock('tabletojson')

describe('getWorlds', () => {
  it('get worlds list information', async () => {
    tabletojson.convertUrl.mockResolvedValue(worldsMock)

    const worlds = await getWorlds()
    expect(worlds)
      .toStrictEqual({
        worlds: [
          { world: 'Antica', online: 826, location: 'Europe', pvpType: 'Open PvP', additionalInfo: '' },
          { world: 'Assombra', online: 88, location: 'South America', pvpType: 'Retro Hardcore PvP', additionalInfo: '' },
          { world: 'Astera', online: 342, location: 'North America', pvpType: 'Optional PvP', additionalInfo: '' }
        ],
        tournamentWorlds: [
          { world: 'Endebra', online: 0, location: 'South America', pvpType: 'Open PvP', additionalInfo: 'premium, blocked, restricted Store products' }
        ]
      })
  })

  it('get worlds list information without tournamentworlds', async () => {
    tabletojson.convertUrl.mockResolvedValue(worldsWithoutTournamentMock)

    const worlds = await getWorlds()
    expect(worlds)
      .toStrictEqual({
        worlds: [
          { world: 'Antica', online: 826, location: 'Europe', pvpType: 'Open PvP', additionalInfo: '' },
          { world: 'Assombra', online: 88, location: 'South America', pvpType: 'Retro Hardcore PvP', additionalInfo: '' },
          { world: 'Astera', online: 342, location: 'North America', pvpType: 'Optional PvP', additionalInfo: '' }
        ],
        tournamentWorlds: []
      })
  })
})
