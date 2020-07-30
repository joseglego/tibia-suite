const cheerio = require('cheerio')
const fetchHTML = require('../utils/fetchHTML')
const tableToJson = require('../utils/tableToJson')

const parseCharacter = (htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)

  return ({
    name: $('td:nth-of-type(1)').text().trim(),
    level: +$('td:nth-of-type(2)').text().trim(),
    vocation: $('td:nth-of-type(3)').text().trim()
  })
}

const getWorld = async (name) => {
  if (!name) { throw new Error('The world name is required.') }
  if (typeof name !== 'string') { throw new Error('The world name must be a string.') }

  let body
  try {
    body = await fetchHTML(`https://www.tibia.com/community/?subtopic=worlds&world=${name}`)
  } catch (err) {
    throw new Error('There was a problem with the conection.')
  }

  const worldNotFound = 'World with this name doesn\'t exist!'
  const $ = cheerio.load(body)

  if ($('#worlds .BoxContent table tr').eq(0).text() === worldNotFound) {
    throw new Error(`${worldNotFound}.`)
  }

  const worldInfo = tableToJson($('#worlds .InnerTableContainer').eq(1).html())
  const onlineCharacters = $('#worlds .InnerTableContainer').eq(2)
    .find('tr')
    .slice(1)
    .map((_, element) => parseCharacter($(element).html())).get()

  return { worldInfo, onlineCharacters }
}

module.exports = getWorld
