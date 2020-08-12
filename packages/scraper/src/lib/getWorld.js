const cheerio = require('cheerio')

const fetchHTML = require('../utils/fetchHTML')
const tableToJson = require('../utils/tableToJson')
const validateInput = require('../utils/validateInput')
const notFoundError = require('../utils/notFoundError')

const parseCharacter = (htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)

  return ({
    name: $('td:nth-of-type(1)').text().trim(),
    level: +$('td:nth-of-type(2)').text().trim(),
    vocation: $('td:nth-of-type(3)').text().trim()
  })
}

const getWorld = async (name) => {
  validateInput(name, 'World Name')

  const body = await fetchHTML(`https://www.tibia.com/community/?subtopic=worlds&world=${name}`)
  const worldNotFound = 'World with this name doesn\'t exist!'
  const $ = cheerio.load(body)

  if ($('#worlds .BoxContent table tr').eq(0).text() === worldNotFound) {
    notFoundError('World')
  }

  const worldInfo = tableToJson($('#worlds .InnerTableContainer').eq(1).html())
  const onlineCharacters = $('#worlds .InnerTableContainer').eq(2)
    .find('tr')
    .slice(1)
    .map((_, element) => parseCharacter($(element).html())).get()

  return { worldInfo, onlineCharacters }
}

module.exports = getWorld
