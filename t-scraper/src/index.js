const getCharacter = require('./libs/getCharacter')

const run = async () => {
  const characterNames = ['Jnoumis', 'Momzo', 'Zdechly Slon']

  characterNames.forEach(async (characterName) => {
    const character = await getCharacter(characterName)
    console.log(character)
  })
}

run()
