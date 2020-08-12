const cheerio = require('cheerio')

const fetchHTML = require('../utils/fetchHTML')
const validateInput = require('../utils/validateInput')

const parseMember = (rank, htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)
  const nickExp = /\(([^)]+)\)/.exec($('td').eq(1).text())
  const nameExp = /([^)]+) \(/.exec($('td').eq(1).text())

  return {
    rank,
    name: (nameExp && nameExp[1]) || $('td').eq(1).text(),
    nick: (nickExp && nickExp[1]),
    vocation: $('td').eq(2).text(),
    level: +$('td').eq(3).text(),
    joined: $('td').eq(4).text(),
    status: $('td').eq(5).text()
  }
}

const parseInvitation = (htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)

  return {
    name: $('td').eq(0).text(),
    invitationDate: $('td').eq(1).text()
  }
}

const getGuild = async (name) => {
  validateInput(name, 'Guild Name')

  let body
  try {
    body = await fetchHTML(`https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${name}`)
  } catch (err) {
    throw new Error('There was a problem with the conection.')
  }

  const $ = cheerio.load(body)
  const guildNotFound = 'An internal error has occurred. Please try again later!'

  if ($('#guilds .BoxContent table tr').eq(0).text() === guildNotFound) {
    throw new Error('Could not find guild.')
  }

  let rank

  const logo = $('#guilds .BoxContent img').attr('src')
  const description = $('#GuildInformationContainer').text()
  const members = $('table.TableContent').eq(0)
    .find('tr[bgcolor=#F1E0C6], tr[bgcolor=#F1E0C6]')
    .map((_, element) => {
      rank = $(element).find('td').eq(0).text().trim() || rank
      return parseMember(rank, $(element).html())
    }).get()

  const invitations = $('table.TableContent').eq(1)
    .find('tr[bgcolor=#D4C0A1], tr[bgcolor=#F1E0C6]')
    .slice(1)
    .map((_, element) => parseInvitation($(element).html())).get()

  const guildInfo = {
    name,
    logo,
    description,
    totalMembers: members.length,
    onlineMembers: members.filter(member => member.status === 'online').length,
    offlineMembers: members.filter(member => member.status === 'offline').length
  }

  return { guildInfo, members, invitations }
}

module.exports = getGuild
