const { getCharacter } = require('@tibia-suite/scraper')

const run = () => {
  getCharacter('Bobeek').then((data) => {
    const character = data
    console.log(character)
  })
}

run()
