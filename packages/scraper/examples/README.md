# List of Examples for @tibia-suite/scraper

## Take in Consideration
- It's for server/node projects. (We are working an API for FrontEnd Projects too.)
- We are using node `14.3.0`
- We have a package with the dependency `@tibia-suite/scraper`

## Get Character
- **Async** ([file](./character-async.js))
```
const { getCharacter } = require('@tibia-suite/scraper')

const run = async () => {
  const character = await getCharacter('Bobeek')
  console.log(character)
}

run()
```

- **Callback** ([file](./character-callback.js))
```
const { getCharacter } = require('@tibia-suite/scraper')

const run = () => {
  getCharacter('Bobeek').then((data) => {
    const character = data
    console.log(character)
  })
}

run()
```
