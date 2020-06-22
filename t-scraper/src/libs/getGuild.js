const tabletojson = require('tabletojson').Tabletojson

const getArray = (array) => {
  if (array.length === 1) {
    return []
  }

  return array.slice(1, array.length)
}

const translateGuildInfo = (tableInfo) => {
  return tableInfo[3][0][0]
}

const translateMember = (member, rank) => {
  const nickExp = /\(([^)]+)\)/.exec(member[1])
  const nameExp = /([^)]+) \(/.exec(member[1])

  return ({
    rank,
    name: (nameExp && nameExp[1]) || member[1],
    nick: (nickExp && nickExp[1]),
    vocation: member[2],
    level: +member[3],
    joined: member[4],
    status: member[5]
  })
}

const translateMembers = (tableInfo) => {
  const membersArray = getArray(tableInfo[11])
  let rank

  return membersArray.map((member) => {
    rank = member[0] || rank
    return translateMember(member, rank)
  })
}

const translateInvitations = (tableInfo) => {
  const invitationsArray = getArray(tableInfo[15])

  return invitationsArray.map((invitation) => ({
    name: invitation[0],
    invitationDate: invitation[1]
  }))
}

const getGuild = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${name}`
  const tableInfo = await tabletojson.convertUrl(url)

  const guildInfo = translateGuildInfo(tableInfo)
  const members = translateMembers(tableInfo)
  const invitations = translateInvitations(tableInfo)

  return { guildInfo, members, invitations }
}

module.exports = getGuild
