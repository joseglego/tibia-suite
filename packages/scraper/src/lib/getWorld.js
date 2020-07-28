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
  const body = await fetchHTML(`https://www.tibia.com/community/?subtopic=worlds&world=${name}`)
  const $ = cheerio.load(body)

  const worldInfo = tableToJson($('#worlds .InnerTableContainer').eq(1).html())
  const onlineCharacters = $('#worlds .InnerTableContainer').eq(2)
    .find('tr')
    .slice(1)
    .map((_, element) => parseCharacter($(element).html())).get()

  return { worldInfo, onlineCharacters }
}

module.exports = getWorld
