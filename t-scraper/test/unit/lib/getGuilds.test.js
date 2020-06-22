const tabletojson = require('tabletojson').Tabletojson

const getGuilds = require('../../../src/libs/getGuilds')
const guildsMock = require('../../stubs/guilds.json')

jest.mock('tabletojson')

describe('getGuilds', () => {
  it('get guilds from a world', async () => {
    tabletojson.convertUrl.mockResolvedValue(guildsMock)

    const guilds = await getGuilds('Mock Guilds')
    expect(guilds).toStrictEqual({
      guilds: [
        {
          image: 'https://static.tibia.com/images/community/default_logo.gif" width="64" height="64',
          name: 'Ahjar Dilenox',
          description: 'usted ya no me puede maldecirme porque ya yo estoy maldito.'
        },
        {
          image: 'https://static.tibia.com/images/guildlogos/Airglow.gif" width="64" height="64',
          name: 'Airglow',
          description: 'Gildia PVP. Organizujemy tez teamhunty i questy dla czlonkow gildi. Teamspeak wymagany. W sprawie dolaczenia skontaktuj sie z ktoryms z liderow.'
        },
        {
          image: 'https://static.tibia.com/images/guildlogos/Alanui_Institute.gif" width="64" height="64',
          name: 'Alanui Institute',
          description: 'Founded in 2018, The Alanui Institute mobilizes resources and tools for ideas and actions that transform Tibia. The institute work with leaders and social organizations and a global network of supporters to promote equality, social justice and opportunity in form of art for all players. It has classes in literature, acting, painting, sculpture, music, interiors and flowers design. It also work with various services on behalf of the community. The headquarters is on Harbour Street in Thais.'
        }
      ]
    })
  })
})
