# T-Scrapper
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- [Español](./README-es.md)

## Idea
This is a JavaScript lib which works as a webscraper to get information from [Tibia](https://www.tibia.com/news/?subtopic=latestnews)

The main idea was get Inforamtion about characters. But, right now I'm working in more elements.

## Use
### Install
- `npm run install`

### Use
- `npm run start`

### Lints & Tests
- `npm run lint`
- `npm run test`

## Features
### getCharacter
- `getCharacter`: Receive user name.
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
