const querystring = require('querystring')
const cheerio = require('cheerio')

const fetchHTML = require('../utils/fetchHTML')
const tableToJson = require('../utils/tableToJson')
const validateInput = require('../utils/validateInput')
const notFoundError = require('../utils/notFoundError')

const parseHouses = (htmlString) => {
  const $ = cheerio.load(htmlString)
  const houses = []
  $('tr')
    .each((i, element) => {
      const guildTitle = 'House:'
      const rowTitle = $(element).find('td:nth-of-type(1)').text().trim()

      if (rowTitle === guildTitle) {
        const url = $(element).find('td:nth-of-type(2) a').attr('href')
        const { town, houseid: houseId } = querystring.decode(url)
        const paidUntil = $(element).find('td:nth-of-type(2)').text().split(' ').slice(-1)[0]
        const name = $(element).find('td:nth-of-type(2) a').text()

        houses.push({ houseId, name, town, paidUntil })
      }
    })

  return houses
}

const parseGuild = (htmlString) => {
  const $ = cheerio.load(htmlString)
  let guild
  $('tr')
    .each((i, element) => {
      const guildTitle = 'Guild Membership:'
      const rowTitle = $(element).find('td:nth-of-type(1)').text().trim()

      if (rowTitle === guildTitle) {
        const text = $(element).find('td:nth-of-type(2)').text()
        const name = $(element).find('td:nth-of-type(2) a').text()
        const rank = text.substring(0, text.length - 8 - name.length)
        guild = { name, rank }
        return false
      }
    })

  return guild
}

const parseAchievements = (htmlString) => {
  const $ = cheerio.load(htmlString)
  const achievementsEmpty = 'There are no achievements set to be displayed for this character.'

  if ($('tr').eq(1).text() === achievementsEmpty) { return [] }

  return $('tr[bgcolor="#D4C0A1"], tr[bgcolor="#F1E0C6"]')
    .map((_, element) => ({
      stars: $(element).find('td:nth-of-type(1)').children().length,
      name: $(element).find('td:nth-of-type(2)').text().trim()
    })).get()
}

const parseDeaths = (htmlString) => {
  const $ = cheerio.load(htmlString)

  return $('tr')
    .slice(1)
    .map((_, element) => ({
      date: $(element).find('td:nth-of-type(1)').text().trim(),
      description: $(element).find('td:nth-of-type(2)').text().trim(),
      involved: $(element).find('td:nth-of-type(2) a').map((_, a) => $(a).text()).get()
    })).get()
}

const parseCharacterInformation = (htmlString) => {
  const $ = cheerio.load(htmlString)
  const characterInfo = tableToJson($.html(), 1)

  if (characterInfo.guildMembership) {
    characterInfo.guildMembership = parseGuild($.html())
  }

  if (characterInfo.house) {
    delete characterInfo.house
    characterInfo.houses = parseHouses($.html())
  }

  return characterInfo
}

const parseCharacters = (htmlString) => {
  const $ = cheerio.load(htmlString)

  return $('tr[bgcolor="#D4C0A1"], tr[bgcolor="#F1E0C6"]')
    .slice(1)
    .map((_, element) => ({
      main: $(element).children('td:nth-of-type(1)').html().includes('account/maincharacter.png'),
      name: $(element).find('input[name="name"]').val(),
      status: $(element).children('td:nth-of-type(3) ').text() || 'offline',
      world: $(element).children('td:nth-of-type(2)').text().trim()
    })).get()
}

const getCharacter = async (name) => {
  validateInput(name, 'Character Name')

  const body = await fetchHTML(`https://www.tibia.com/community/?subtopic=characters&name=${name}`)
  const $ = cheerio.load(body)
  const characterNotFound = 'Could not find character'

  if ($('#characters .BoxContent table tr').eq(0).text() === characterNotFound) {
    notFoundError('Character')
  }

  const result = {}

  $('#characters div.BoxContent')
    .find('table')
    .each((index, element) => {
      const title = $(element).find('tr').eq(0).text().trim()
      const tasks = {
        'Account Achievements': () => {
          const achievements = parseAchievements($.html(element))
          if (achievements.length) { result.achievements = achievements }
        },
        'Account Information': () => { result.accountInfo = tableToJson($.html(element), 1) },
        'Character Deaths': () => { result.deaths = parseDeaths($.html(element)) },
        'Character Information': () => { result.characterInfo = parseCharacterInformation($.html(element)) },
        Characters: () => { result.characters = parseCharacters($.html(element)) }
      }

      if (title && tasks[title]) {
        tasks[title]()
      }
    })

  return result
}

module.exports = getCharacter
