const cheerio = require('cheerio')

const fetchHTML = require('../utils/fetchHTML')
const validateInput = require('../utils/validateInput')

const parseGuild = (htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)
  const name = $('td:nth-of-type(2) b').text()

  return ({
    description: $('td:nth-of-type(2)').text().slice(name.length),
    logo: $('td:nth-of-type(1) img').attr('src'),
    name
  })
}

const getGuilds = async (name) => {
  validateInput(name, 'World Name')

  const body = await fetchHTML(`https://www.tibia.com/community/?subtopic=guilds&world=${name}`)
  const $ = cheerio.load(body)

  if ($('#guilds .CaptionContainer').length === 1) {
    throw new Error('Could not find world.')
  }

  const active = $('#guilds .TableContentContainer:nth-of-type(1)')
    .find('tr[bgcolor="#D4C0A1"], tr[bgcolor="#F1E0C6"]')
    .slice(1)
    .map((i, element) => parseGuild($(element).html())).get()

  const formation = $('#guilds .TableContentContainer:nth-of-type(2)')
    .find('tr[bgcolor="#D4C0A1"], tr[bgcolor="#F1E0C6"]')
    .slice(1)
    .map((i, element) => parseGuild($(element).html())).get()

  return { world: name, active, formation }
}

module.exports = getGuilds
