const { Command, flags } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')

const scraper = require('@tibia-suite/scraper')

const drawTable = require('../utils/draw-table')
const MAX_LENGTH = 80

const parseGuild = (guild) => {
  let description = guild.description.substr(0, MAX_LENGTH)

  description += guild.description.length > MAX_LENGTH ? '...' : ''

  return [guild.name, description]
}

const filterByName = (_name, _toFind, insensitive) => {
  const name = !insensitive ? _name : _name.toLowerCase()
  const toFind = !insensitive ? _toFind : _toFind.toLowerCase()

  return name.includes(toFind)
}

class GuildsCommand extends Command {
  async run () {
    const { flags } = this.parse(GuildsCommand)

    if (!flags.server) {
      throw new CLIError('server is required to get information')
    }

    cli.action.start('starting a process')
    const guildsData = await scraper.getGuilds(flags.server)
    const totalGuilds = guildsData.guilds.length
    let { guilds } = guildsData
    let guildsToShow = totalGuilds

    if (flags.filter) {
      guilds = guilds.filter(guild => filterByName(guild.name, flags.filter, flags.insensitive))
      guildsToShow = `${guilds.length} / ${totalGuilds}`
    }

    cli.action.stop('')

    drawTable(`Guilds (${guildsToShow})`, ...guilds.map(parseGuild))
  }
}

GuildsCommand.description = 'List the guilds of a world'

GuildsCommand.flags = {
  server: flags.string({ char: 's', description: 'server where the guilds are' }),
  filter: flags.string({ char: 'f', description: 'find by (part of the) name', required: false }),
  insensitive: flags.boolean({ char: 'i', description: 'find is insensitive', dependsOn: ['filter'], required: false })
}

module.exports = GuildsCommand
