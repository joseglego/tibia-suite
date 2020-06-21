const tabletojson = require('tabletojson').Tabletojson
const translateJson = require('../utils/translateJson')

const translateCharacter = (json) => ({
  name: json[0],
  level: +json[1],
  vocation: json[2]
})

const getWorld = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=worlds&world=${name}`
  const tableInfo = await tabletojson.convertUrl(url)

  const onlineCharactersArray = tableInfo[5].slice(1, tableInfo[5].length)

  const worldInfo = tableInfo[3].reduce(translateJson, {})
  const onlineCharacters = onlineCharactersArray.map(translateCharacter)

  return { worldInfo, onlineCharacters }
}

module.exports = getWorld
