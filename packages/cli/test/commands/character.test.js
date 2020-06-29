const { expect, test } = require('@oclif/test')

const scraper = require('@tibia-suite/scraper')

const basicStub = require('../stubs/basicCharacterResponse.json')
const basicStoud = require('../stubs/basicCharacterStdout')
const complexStub = require('../stubs/complexCharacterResponse.json')
const complexStoud = require('../stubs/complexCharacterStdout')
const minifiedStoud = require('../stubs/minifiedCharacterStdout')

describe('@tibia-suite/cli character', () => {
  test
    .stdout()
    .command([
      'character'
    ])
    .exit(2)
    .it('throws error when name is not provided')

  test
    .stub(scraper, 'getCharacter', () => basicStub)
    .stdout()
    .command([
      'character',
      '--name',
      'Basic'
    ])
    .it('show character with basic information', ctx => {
      expect(ctx.stdout).to.equal(basicStoud)
    })

  test
    .stub(scraper, 'getCharacter', () => complexStub)
    .stdout()
    .command([
      'character',
      '--name',
      'Complex'
    ])
    .it('show character with complex information', ctx => {
      expect(ctx.stdout).to.equal(complexStoud)
    })

  test
    .stub(scraper, 'getCharacter', () => complexStub)
    .stdout()
    .command([
      'character',
      '--name',
      'Complex',
      '--minified'
    ])
    .it('show character with minified information', ctx => {
      expect(ctx.stdout).to.equal(minifiedStoud)
    })
})
