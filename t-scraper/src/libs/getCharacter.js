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

const getAchievements = (tableInfo) => {
  const achievementsArray = tableInfo
    .find(array => array[0][0] === 'Account Achievements')

  if (!achievementsArray || achievementsArray[1][0] === 'There are no achievements set to be displayed for this character.') {
    return []
  }

  return achievementsArray.slice(1, achievementsArray.length).map((achievement) => achievement[1])
}

const getCharacter = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=characters&name=${name}`
  const tableInfo = await tabletojson.convertUrl(url)
  const characterInfo = getCharacterInfo(tableInfo)
  const achievements = getAchievements(tableInfo)

  return { characterInfo, achievements }
}

module.exports = getCharacter
