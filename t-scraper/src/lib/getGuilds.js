const tabletojson = require('tabletojson').Tabletojson

const translateGuild = (json) => {
  const imageEval = /src="(.+)"/.exec(json[0])
  const nameEval = /<b>(.+)<\/b>/.exec(json[1])
  const descriptionEval = /<\/b><br>(.*)/.exec(json[1])

  return ({
    image: imageEval[1],
    name: nameEval[1],
    description: descriptionEval[1]
  })
}

const translateGuilds = (acc, guildJson) => {
  if (guildJson[0] && guildJson[1]) {
    acc.push(translateGuild(guildJson))
  }

  return acc
}
const getGuilds = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=guilds&world=${name}`
  const tableInfo = await tabletojson.convertUrl(url, { stripHtmlFromCells: false })

  const guilds = tableInfo[6].slice(1, tableInfo[6].length).reduce(translateGuilds, [])

  return { guilds }
}

module.exports = getGuilds
