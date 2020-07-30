const { getCharacter } = require('@tibia-suite/scraper')

const run = async () => {
  const character = await getCharacter('Bobeek')
  console.log(character)
}

run()
