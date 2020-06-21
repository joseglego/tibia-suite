# T-Scrapper
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- [English](./README.md)

## Idea
Es una pequeña librería de JavaScript que funciona como WebScraper para obtener información de la página Oficial de [Tibia](https://www.tibia.com/news/?subtopic=latestnews)

La idea era obtener información de los Personajes. Sin embargo, estoy trabajando en más elementos.

## Uso
### Instalación
- `npm run install`

### Uso
- `npm run start`

### Lints & Tests
- `npm run lint`
- `npm run test`

## Funcionalidades
### getCharacter
- `getCharacter`: Recibe el nombre del Personaje.
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
