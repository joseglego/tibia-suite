const cheerio = require('cheerio')
const fetchHTML = require('../utils/fetchHTML')

const parseBattleEye = srcImg => {
  if (srcImg.includes('icon_battleye.gif')) { return 'protected' }
  if (srcImg.includes('icon_battleyeinitial.gif')) { return 'initial' }

  return ''
}

const parseWorld = (htmlString) => {
  const $ = cheerio.load(`<table><tr>${htmlString}</tr></table>`)

  return ({
    additionalInfo: $('td:nth-of-type(6)').text().trim(),
    battleEye: parseBattleEye($('td:nth-of-type(5)').html()),
    location: $('td:nth-of-type(3)').text(),
    name: $('td:nth-of-type(1)').text(),
    online: $('td:nth-of-type(2)').text() !== '-' ? +$('td:nth-of-type(2)').text() : 0,
    pvpType: $('td:nth-of-type(4)').text()
  })
}

const getWorlds = async () => {
  const body = await fetchHTML('https://www.tibia.com/community/?subtopic=worlds')
  const $ = cheerio.load(body)

  const worlds = $('#worlds .TableContentContainer:nth-of-type(3)')
    .find('tr.Odd,tr.Even')
    .map((i, element) => parseWorld($(element).html())).get()

  const tournamentWorlds = $('#worlds .TableContentContainer:nth-of-type(5)')
    .find('tr.Odd,tr.Even')
    .map((i, element) => parseWorld($(element).html())).get()

  return { worlds, tournamentWorlds }
}

module.exports = getWorlds
