const tabletojson = require('tabletojson').Tabletojson
const camelize = require('../utils/camelize')

const getArrayInfo = (tableInfo, title) => {
  const array = tableInfo.find(array => array[0][0] === title)

  if (!array) {
    return []
  }

  return array.slice(1, array.length)
}

const translateJson = (acc, json) => {
  const keyName = camelize(json[0].substring(0, json[0].length - 1))
  const value = json[1]
  acc[`${keyName}`] = value

  return acc
}

const getCharacterInfo = (tableInfo) => {
  const characterInfoArray = tableInfo[0].slice(1, tableInfo[0].length)

  return characterInfoArray.reduce(translateJson, {})
}

const getAchievements = (tableInfo) => {
  const achievementsTitle = 'Account Achievements'
  const achievementsEmpty = 'There are no achievements set to be displayed for this character.'
  const achievementsArray = getArrayInfo(tableInfo, achievementsTitle)

  if (achievementsArray.length === 0 || achievementsArray[0][0] === achievementsEmpty) {
    return []
  }

  return achievementsArray.map((achievement) => achievement[1])
}

const getDeaths = (tableInfo) => {
  const deathsTitle = 'Character Deaths'
  const deathsArray = getArrayInfo(tableInfo, deathsTitle)

  return deathsArray.map((death) => ({ date: death[0], description: death[1] }))
}

const getAccountInfo = (tableInfo) => {
  const accountInfoTitle = 'Account Information'
  const accountInfoArray = getArrayInfo(tableInfo, accountInfoTitle)

  return accountInfoArray.reduce(translateJson, {})
}

const getCharacter = async (name) => {
  const url = `https://www.tibia.com/community/?subtopic=characters&name=${name}`
  const tableInfo = await tabletojson.convertUrl(url)

  const characterInfo = getCharacterInfo(tableInfo)
  const achievements = getAchievements(tableInfo)
  const deaths = getDeaths(tableInfo)
  const accountInfo = getAccountInfo(tableInfo)

  return { characterInfo, achievements, deaths, accountInfo }
}

module.exports = getCharacter
