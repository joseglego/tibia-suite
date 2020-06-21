const tabletojson = require('tabletojson').Tabletojson

const translateWorld = (json) => ({
  world: json[0],
  online: json[1] !== '-' ? +json[1] : 0,
  location: json[2],
  pvpType: json[3],
  additionalInfo: json[5]
})

const getWorlds = async () => {
  const url = 'https://www.tibia.com/community/?subtopic=worlds'
  const tableInfo = await tabletojson.convertUrl(url)

  const worldsArray = tableInfo[4].slice(1, tableInfo[4].length)
  const tournamentArray = tableInfo[6] ? tableInfo[6].slice(1, tableInfo[6].length) : []
  const worlds = worldsArray.map(translateWorld)
  const tournamentWorlds = tournamentArray.map(translateWorld)
  return { worlds, tournamentWorlds }
}

module.exports = getWorlds
