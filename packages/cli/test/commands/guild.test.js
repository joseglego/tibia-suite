const { expect, test } = require('@oclif/test')

const scraper = require('@tibia-suite/scraper')

const guildStub = require('../stubs/guildResponse.json')
const guildAllOnlineStub = require('../stubs/guildAllOnlineResponse.json')

const guildStoud = require('../stubs/guildStdout')
const guildOnlineStoud = require('../stubs/guildOnlineStdout')
const guildAllOnlineStoud = require('../stubs/guildAllOnlineStdout.js')
const guildLevelStoud = require('../stubs/guildLevelStdout')

describe('@tibia-suite/cli guild', () => {
  test
    .stdout()
    .command([
      'guild'
    ])
    .exit(2)
    .it('throws error when name is not provided')

  test
    .stub(scraper, 'getGuild', () => guildStub)
    .stdout()
    .command([
      'guild',
      '--name',
      'Guild'
    ])
    .it('show guild information', ctx => {
      expect(ctx.stdout).to.equal(guildStoud)
    })

  test
    .stub(scraper, 'getGuild', () => guildAllOnlineStub)
    .stdout()
    .command([
      'guild',
      '--name',
      'Guild'
    ])
    .it('show guild information, with all members online', ctx => {
      expect(ctx.stdout).to.equal(guildAllOnlineStoud)
    })

  test
    .stub(scraper, 'getGuild', () => guildStub)
    .stdout()
    .command([
      'guild',
      '--name',
      'Guild',
      '--online'
    ])
    .it('show guild with only online members', ctx => {
      expect(ctx.stdout).to.equal(guildOnlineStoud)
    })

  test
    .stub(scraper, 'getGuild', () => guildStub)
    .stdout()
    .command([
      'guild',
      '--name',
      'Guild',
      '-l'
    ])
    .it('show guild with members sorted by level', ctx => {
      expect(ctx.stdout).to.equal(guildLevelStoud)
    })
})
