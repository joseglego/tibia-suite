const { expect, test } = require('@oclif/test')

const scraper = require('@tibia-suite/scraper')

const worldStub = require('../stubs/worldResponse.json')
const worldStdout = require('../stubs/worldStdout')
const worldLevelStdout = require('../stubs/worldLevelStdout')
const worldVocationStdout = require('../stubs/worldVocationStdout')

describe('@tibia-suite/cli world', () => {
  test
    .stdout()
    .command([
      'world'
    ])
    .exit(2)
    .it('throws error when name is not provided')

  test
    .stub(scraper, 'getWorld', () => worldStub)
    .stdout()
    .command([
      'world',
      '--name',
      'World'
    ])
    .it('show world information', ctx => {
      expect(ctx.stdout).to.equal(worldStdout)
    })

  test
    .stub(scraper, 'getWorld', () => worldStub)
    .stdout()
    .command([
      'world',
      '--name',
      'World',
      '--level'
    ])
    .it('show world information, with chars sort by level', ctx => {
      expect(ctx.stdout).to.equal(worldLevelStdout)
    })

  test
    .stub(scraper, 'getWorld', () => worldStub)
    .stdout()
    .command([
      'world',
      '--name',
      'World',
      '--vocation'
    ])
    .it('show world information, with chars group by vocation', ctx => {
      expect(ctx.stdout).to.equal(worldVocationStdout)
    })
})
