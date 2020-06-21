const tabletojson = require('tabletojson').Tabletojson
const camelize = require('../utils/camelize')

const getCharacterInfo = (tableInfo) => {
  const characterInfoArray = tableInfo[0].slice(1, tableInfo[0].length)

  return characterInfoArray.reduce((characterInfo, row) => {
    const keyName = camelize(row[0].substring(0, row[0].length - 1))
    const value = row[1]
    characterInfo[`${keyName}`] = value

    return characterInfo
  }, {})
}

const getCharacter = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=characters&name=${name}`
  const tableInfo = await tabletojson.convertUrl(url)
  const characterInfo = getCharacterInfo(tableInfo)

  return { characterInfo }
}

module.exports = getCharacter
