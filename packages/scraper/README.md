@tibia-suite/scraper
================

A Lib to get infromation from tibia.com in your application directly from official webpage.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Version](https://img.shields.io/npm/v/@tibia-suite/scraper.svg)](https://npmjs.org/package/@tibia-suite/scraper)
[![License](https://img.shields.io/npm/l/@tibia-suite/scraper.svg)](https://github.com/joseglego/tibia-suite/blob/master/package.json)

## Idea
This is a JavaScript lib which works as a webscraper to get information from [Tibia](https://www.tibia.com/news/?subtopic=latestnews)

The main idea was get Inforamtion about characters. But, right now I'm working in more elements.

## Install
```sh
npm install --save @tibia-suite/scraper
```

## Usage
### By Feature
```sh
const { getCharacter } = require('@tibia-suite/scraper')

getCharacter('Character Name').then((character) => {
  //
})
```

### Whole Package
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

## Features
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
  guildInfo
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
