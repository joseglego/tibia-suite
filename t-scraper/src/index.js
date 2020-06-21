const getCharacter = require('./libs/getCharacter')

const run = async () => {
  const character = await getCharacter('Jnoumis')
  console.log(character)
}

run()
