const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')

const scraper = require('@tibia-suite/scraper')

const drawTable = require('../utils/draw-table')

const parseWorld = (world) => [world.world, world.online, world.location, world.pvpType, world.additionalInfo]

class WorldsCommand extends Command {
  async run () {
    const LOCATIONS = { eu: 'Europe', na: 'North America', sa: 'South America' }
    const worldHeaders = ['World', 'Online', 'Location', 'PvP Type', 'Additional Information']
    const { flags } = this.parse(WorldsCommand)

    cli.action.start('starting a process')
    const worldsData = await scraper.getWorlds()
    const totalWorlds = worldsData.worlds.length
    const totalTournalmentWorlds = worldsData.tournamentWorlds.length
    let { worlds, tournamentWorlds } = worldsData
    let worldsToShow = totalWorlds
    let tournamentWorldsToShow = totalTournalmentWorlds

    if (flags.location) {
      const location = LOCATIONS[flags.location]
      worlds = worlds.filter(world => world.location === location)
      worldsToShow = `${worlds.length} / ${totalWorlds}`
      tournamentWorlds = tournamentWorlds.filter(world => world.location === location)
      tournamentWorldsToShow = `${tournamentWorlds.length} / ${totalTournalmentWorlds}`
    }

    if (flags.online) {
      worlds = worlds.sort((world1, world2) => world2.online - world1.online)
      tournamentWorlds = tournamentWorlds.sort((world1, world2) => world2.online - world1.online)
    }

    cli.action.stop()

    drawTable(`Regular Worlds (${worldsToShow})`, worldHeaders, ...worlds.map(parseWorld))
    drawTable(`Tournament Worlds (${tournamentWorldsToShow})`, worldHeaders, ...tournamentWorlds.map(parseWorld))
  }
}

WorldsCommand.description = 'Get the list of worlds from tibia.com'

WorldsCommand.flags = {
  location: flags.string(
    { char: 'l', description: 'filter by location', options: ['eu', 'na', 'sa'], required: false }
  ),
  online: flags.boolean({ char: 'o', description: 'order by amounf of online characters', required: false })
}

module.exports = WorldsCommand
