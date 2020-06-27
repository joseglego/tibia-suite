# Scrapper
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- [English](./README.md)

## Idea
Es una pequeña librería de JavaScript que funciona como WebScraper para obtener información de la página Oficial de [Tibia](https://www.tibia.com/news/?subtopic=latestnews)

La idea era obtener información de los Personajes. Sin embargo, estoy trabajando en más elementos.

## Instalación
```sh
npm install --save @tibia-suite/scraper
```

## Uso
### Importar por funcionalidad
```sh
const { getCharacter } = require('@tibia-suite/scraper')

getCharacter('Character Name').then((character) => {
  //
})
```

### Importar paquete completo
```sh
const tibia-scraper = require('@tibia-suite/scraper')

tibia-scraper.getCharacter('Character Name').then((character) => {
  //
})
```

## Lints & Tests
```sh
npm run lint
npm run test
```

## Funcionalidades
### getCharacter
- `getCharacter(characterName)`:
```js
{
  characterInfo: {
    name,
    title,
    sex,
    vocation,
    level,
    achievementPoints,
    world,
    residence,
    lastLogin,
    accountStatus
  },
  achievements: [],
  deaths: [{
    date,
    description
  }],
  accountInfo: {
    loyaltyTitle,
    created
  },
  characters: [{
    name,
    world
  }]
}
```

### getWorlds
- `getWorlds`:
```js
{
  worlds: [{
    world,
    online,
    location,
    pvpType,
    additionalInfo,
  }],
  tournamentWorlds: [{
    world,
    online,
    location,
    pvpType,
    additionalInfo,
  }]
}
```

### getWorld
- `getWorld(worldName)`:
```js
{
  worldInfo: {
    status,
    playersOnline,
    onlineRecord,
    creationDate,
    location,
    pvPType,
    worldQuestTitles,
    battlEyeStatus,
    gameWorldType
  },
  onlineCharacters: [{
    name,
    level,
    vocation
  }]
}
```

### getGuild
- `getGuild(guildName)`:
```js
{
  guildInfo: 'Gildia PVP. Organizujemy tez teamhunty i questy dla czlonkow gildi. Teamspeak wymagany. W sprawie dolaczenia skontaktuj sie z ktoryms z liderow.\nThe guild was founded on Antica on Feb 13 2018.\nIt is currently active.\nGuild is opened for applications.',
  members: [{
    joined,
    level,
    name,
    nick,
    rank,
    status,
    vocation,
  }],
  invitations: [{
    name,
    invitationDate,
  }]
}
```

### getGuilds
- `getGuilds(worldName)`:
```js
{
  guilds: [
    {
      image,
      name,
      description
    }
  ]
}
```
