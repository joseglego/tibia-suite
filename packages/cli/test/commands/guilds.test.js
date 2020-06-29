const { expect, test } = require('@oclif/test')

const scraper = require('@tibia-suite/scraper')

const basicStub = require('../stubs/guildsResponse.json')
const basicStdout = require('../stubs/guildsStdout')
const filteredStdout = require('../stubs/guildsFilteredStdout')
const insensitiveStdout = require('../stubs/guildsInsensitiveStdout')

describe('@tibia-suite/cli guilds', () => {
  test
    .stdout()
    .command([
      'guilds',
      '--server'
    ])
    .exit(2)
    .it('throws error when server is not provided')

  test
    .stub(scraper, 'getGuilds', () => basicStub)
    .stdout()
    .command([
      'guilds',
      '--server',
      'Basic'
    ])
    .it('show list of guilds for server', ctx => {
      expect(ctx.stdout).to.equal(basicStdout)
    })

  test
    .stub(scraper, 'getGuilds', () => basicStub)
    .stdout()
    .command([
      'guilds',
      '--server',
      'Basic',
      '--filter',
      'Al'
    ])
    .it('show filtered list of guilds for server', ctx => {
      expect(ctx.stdout).to.equal(filteredStdout)
    })

  test
    .stub(scraper, 'getGuilds', () => basicStub)
    .stdout()
    .command([
      'guilds',
      '--server',
      'Basic',
      '--filter',
      'Al',
      '--insensitive'
    ])
    .it('show insensitive filtered list of guilds for server', ctx => {
      expect(ctx.stdout).to.equal(insensitiveStdout)
    })
})
