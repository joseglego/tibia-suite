const tabletojson = require('tabletojson').Tabletojson

const getWorld = require('../../../src/lib/getWorld')
const worldMock = require('../../stubs/world.json')

jest.mock('tabletojson')

describe('getWorld', () => {
  it('get world page details', async () => {
    tabletojson.convertUrl.mockResolvedValue(worldMock)

    const world = await getWorld()
    expect(world)
      .toStrictEqual({
        worldInfo: {
          status: 'Online',
          playersOnline: '624',
          onlineRecord: '1,055 players (on May 01 2020, 17:58:30 CEST)',
          creationDate: '01/97',
          location: 'Europe',
          pvPType: 'Open PvP',
          worldQuestTitles: "Rise of Devovorga, The Lightbearer, The Colours of Magic, A Piece of Cake, Demon's Lullaby",
          battlEyeStatus: 'Protected by BattlEye since August 29, 2017.',
          gameWorldType: 'Regular'
        },
        onlineCharacters: [
          { name: 'Aaellfous Lubilto', level: 8, vocation: 'Sorcerer' },
          { name: 'Abel Paladin Mocny', level: 27, vocation: 'Paladin' },
          { name: 'Abuyin ibn Djadir', level: 34, vocation: 'Paladin' }
        ]
      })
  })
})
