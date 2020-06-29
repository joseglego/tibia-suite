const { expect, test } = require('@oclif/test')

const scraper = require('@tibia-suite/scraper')

const worldsStub = require('../stubs/worldsResponse.json')
const wordlsStdout = require('../stubs/worldsStdout')
const worldsOnlineStdout = require('../stubs/worldsOnlineStdout')
const worldsLocationStdout = require('../stubs/worldsLocationStdout')

describe('@tibia-suite/cli worlds', () => {
  test
    .stub(scraper, 'getWorlds', () => worldsStub)
    .stdout()
    .command([
      'worlds'
    ])
    .it('show world list information', ctx => {
      expect(ctx.stdout).to.equal(wordlsStdout)
    })

  test
    .stub(scraper, 'getWorlds', () => worldsStub)
    .stdout()
    .command([
      'worlds',
      '--online'
    ])
    .it('show world list sorted by online characters', ctx => {
      expect(ctx.stdout).to.equal(worldsOnlineStdout)
    })

  test
    .stub(scraper, 'getWorlds', () => worldsStub)
    .stdout()
    .command([
      'worlds',
      '--location',
      'eu'
    ])
    .it('showworld list filter by location', ctx => {
      expect(ctx.stdout).to.equal(worldsLocationStdout)
    })
})
