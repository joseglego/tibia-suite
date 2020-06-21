const getCharacter = require('./libs/getCharacter')
const getWorlds = require('./libs/getWorlds')

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

const run = async () => {
  await testGetCharacter()
  await testGetWorlds()
}

run()
