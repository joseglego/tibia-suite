const { Command, flags } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')

const { getCharacter } = require('@tibia-suite/scraper')

const jsonToTable = require('../utils/json-to-table')
const drawTable = require('../utils/draw-table')

class CharacterCommand extends Command {
  async run () {
    const { flags } = this.parse(CharacterCommand)
    const { name, minified: minifiedInfo } = flags

    if (!name) {
      throw new CLIError('name is required to get information')
    }

    cli.action.start('starting a process')
    const character = await getCharacter(name)
    cli.action.stop()

    drawTable('Character Information', ...jsonToTable(character.characterInfo))

    if (!minifiedInfo) {
      drawTable('Achievements', ...character.achievements.map(achievement => [achievement]))
      drawTable('Deaths', ...character.deaths.map(death => [death.date, death.description]))
      drawTable('Account Information', ...jsonToTable(character.accountInfo))
      drawTable('Characters', ...character.characters.map(character => ([character.name, character.world])))
    }
  }
}

CharacterCommand.description = 'Get the information from the character at tibia.com'

CharacterCommand.flags = {
  name: flags.string({ char: 'n', description: 'name character to get data' }),
  minified: flags.boolean({ char: 'm', description: 'show only character info without extend data' })
}

module.exports = CharacterCommand
