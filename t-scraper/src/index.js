const getCharacter = require('./lib/getCharacter')
const getWorlds = require('./lib/getWorlds')
const getWorld = require('./lib/getWorld')
const getGuilds = require('./lib/getGuilds')
const getGuild = require('./lib/getGuild')

const testGetCharacter = async () => {
  const characterNames = ['Jnoumis', 'Momzo', 'Zdechly Slon']

  characterNames.forEach(async (characterName) => {
    const character = await getCharacter(characterName)
    console.log(character)
  })
}

const testGetWorlds = async () => {
  const worlds = await getWorlds()
  console.log(worlds)
}

const testGetWorld = async () => {
  const world = await getWorld('Antica')
  console.log(world)
}

const testGetGuilds = async () => {
  const guilds = await getGuilds('Antica')
  console.log(guilds)
}

const testGetGuild = async () => {
  const guild = await getGuild('Elysium')
  console.log(guild)
}

const run = async () => {
  await testGetCharacter()
  await testGetWorlds()
  await testGetWorld()
  await testGetGuilds()
  await testGetGuild()
}

run()
