const cheerio = require('cheerio')
const camelize = require('./camelize')

const tableToJson = (htmlString, offset = 0) => {
  const $ = cheerio.load(htmlString)
  const acc = {}

  $('tr')
    .slice(offset)
    .each((_, element) => {
      const keyRaw = $(element).find('td').eq(0).text()
      const keyName = camelize(keyRaw.substring(0, keyRaw.length - 1))
      const value = $(element).find('td').eq(1).text().trim()

      acc[`${keyName}`] = value
    })

  return acc
}

module.exports = tableToJson
