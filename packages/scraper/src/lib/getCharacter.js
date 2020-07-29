const cheerio = require('cheerio')
const fetchHTML = require('../utils/fetchHTML')
const tableToJson = require('../utils/tableToJson')

const parseAchievements = (htmlString) => {
  const $ = cheerio.load(htmlString)
  const achievementsEmpty = 'There are no achievements set to be displayed for this character.'

  if ($('tr').eq(1).text() === achievementsEmpty) { return [] }

  return $('tr[bgcolor="#D4C0A1"], tr[bgcolor="#F1E0C6"]')
    .map((_, element) => $(element).find('td:nth-of-type(2)').text().trim()).get()
}

const parseDeaths = (htmlString) => {
  const $ = cheerio.load(htmlString)

  return $('tr')
    .slice(1)
    .map((_, element) => ({
      date: $(element).find('td:nth-of-type(1)').text().trim(),
      description: $(element).find('td:nth-of-type(2)').text().trim()
    })).get()
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
  const body = await fetchHTML(`https://www.tibia.com/community/?subtopic=characters&name=${name}`)
  const $ = cheerio.load(body)
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
        'Character Information': () => { result.characterInfo = tableToJson($.html(element), 1) },
        Characters: () => { result.characters = parseCharacters($.html(element)) }
      }

      if (title && tasks[title]) {
        tasks[title]()
      }
    })

  return result
}

module.exports = getCharacter
