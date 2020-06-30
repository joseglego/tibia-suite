const { Command, flags } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')

const scraper = require('@tibia-suite/scraper')

const jsonToTable = require('../utils/json-to-table')
const drawTable = require('../utils/draw-table')
const drawHeader = require('../utils/draw-header')

class WorldCommand extends Command {
  async run () {
    const charactersHeader = drawHeader(['Name', 'Level', 'Vocation'])
    const { flags } = this.parse(WorldCommand)
    const { name } = flags

    if (!name) {
      throw new CLIError('name is required to get information')
    }

    cli.action.start('')
    const world = await scraper.getWorld(name)
    let onlineCharacters = world.onlineCharacters
    cli.action.stop('')

    if (flags.level) {
      onlineCharacters = onlineCharacters.sort((charA, charB) => charB.level - charA.level)
    }

    if (flags.vocation) {
      onlineCharacters = onlineCharacters.sort((charA, charB) => {
        if (charA.vocation < charB.vocation) { return -1 }
        if (charA.vocation > charB.vocation) { return 1 }

        return 0
      })
    }

    drawTable('World Information', ...jsonToTable(world.worldInfo))
    drawTable(
      'Players Online',
      charactersHeader,
      ...onlineCharacters.map(char => [char.name, char.level, char.vocation])
    )
  }
}

WorldCommand.description = `Describe the command here
...
Extra documentation goes here
`

WorldCommand.flags = {
  name: flags.string({ char: 'n', description: 'name of the selected world' }),
  level: flags.boolean({ char: 'l', description: 'sort online characters by level', required: false }),
  vocation: flags.boolean({ char: 'v', description: 'group online characters by vocation', required: false })
}

module.exports = WorldCommand
