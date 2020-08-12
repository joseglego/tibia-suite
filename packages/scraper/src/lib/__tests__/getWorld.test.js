const fetchHTML = require('../../utils/fetchHTML')

const getWorld = require('../getWorld')
const worldPage = require('../../../test/stubs/worldPage')

jest.mock('../../utils/fetchHTML')

describe('getWorld', () => {
  it('get world page details', async () => {
    fetchHTML.mockResolvedValue(worldPage)

    const world = await getWorld('World Name')
    expect(world)
      .toStrictEqual({
        worldInfo: {
          status: 'Online',
          playersOnline: 165,
          onlineRecord: '1,055 players (on May 01 2020, 17:58:30 CEST)',
          creationDate: '01/97',
          location: 'Europe',
          pvPType: 'Open PvP',
          worldQuestTitles: "Rise of Devovorga, The Lightbearer, The Colours of Magic, Bewitched, A Piece of Cake, Demon's Lullaby",
          battlEyeStatus: 'Protected by BattlEye since August 29, 2017.',
          gameWorldType: 'Regular'
        },
        onlineCharacters: [
          { name: 'Aandr', level: 334, vocation: 'Elder Druid' },
          { name: 'Aegon Zaru', level: 70, vocation: 'Elder Druid' },
          { name: 'Akatamachitos', level: 109, vocation: 'Elite Knight' },
          { name: 'Akavom', level: 457, vocation: 'Elder Druid' }
        ]
      })
  })
})
