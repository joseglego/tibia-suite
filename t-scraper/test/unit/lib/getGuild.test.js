const tabletojson = require('tabletojson').Tabletojson

const getGuild = require('../../../src/libs/getGuild')
const guildMock = require('../../stubs/guild.json')
const guildWithoutInvitesMock = require('../../stubs/guildWithoutInvites.json')
jest.mock('tabletojson')

describe('getGuild', () => {
  it('get guild list information', async () => {
    tabletojson.convertUrl.mockResolvedValue(guildMock)

    const guild = await getGuild('Mock Guild')
    expect(guild)
      .toStrictEqual({
        guildInfo: 'Gildia PVP. Organizujemy tez teamhunty i questy dla czlonkow gildi. Teamspeak wymagany. W sprawie dolaczenia skontaktuj sie z ktoryms z liderow.\nThe guild was founded on Antica on Feb 13 2018.\nIt is currently active.\nGuild is opened for applications.',
        members: [{
          joined: 'Jan 26 2020',
          level: 173,
          name: 'Walefajans',
          nick: 'Cool Nick',
          rank: 'Test',
          status: 'offline',
          vocation: 'Master Sorcerer'
        }, {
          joined: 'May 05 2020',
          level: 163,
          name: 'Wareks Rozrabiaka',
          nick: null,
          rank: 'Test',
          status: 'offline',
          vocation: 'Master Sorcerer'
        }, {
          joined: 'Jun 03 2020',
          level: 281,
          name: 'Weeaboo Senpai',
          nick: null,
          rank: 'Test',
          status: 'online',
          vocation: 'Master Sorcerer'
        }],
        invitations: [{
          name: 'Alkharnus',
          invitationDate: 'Jun 14 2020'
        }, {
          name: 'Brius Dadir',
          invitationDate: 'Jun 14 2020'
        }]
      })
  })

  it('handle no invitations guilds', async () => {
    tabletojson.convertUrl.mockResolvedValue(guildWithoutInvitesMock)

    const guild = await getGuild('Mock Guild')
    expect(guild)
      .toStrictEqual({
        guildInfo: 'Gildia PVP. Organizujemy tez teamhunty i questy dla czlonkow gildi. Teamspeak wymagany. W sprawie dolaczenia skontaktuj sie z ktoryms z liderow.\nThe guild was founded on Antica on Feb 13 2018.\nIt is currently active.\nGuild is opened for applications.',
        members: [{
          joined: 'Jan 26 2020',
          level: 173,
          name: 'Walefajans',
          nick: 'Cool Nick',
          rank: 'Test',
          status: 'offline',
          vocation: 'Master Sorcerer'
        }],
        invitations: []
      })
  })
})
