const { Command, flags } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')

const scraper = require('@tibia-suite/scraper')

const drawTable = require('../utils/draw-table')

class GuildCommand extends Command {
  async run () {
    const { flags } = this.parse(GuildCommand)
    const { name, online, level } = flags

    if (!name) {
      throw new CLIError('name is required to get information')
    }

    cli.action.start('starting a process')
    const guild = await scraper.getGuild(name)
    const onlineMembers = guild.members.filter(member => member.status === 'online')
    let membersToShow = guild.members.length !== onlineMembers.length ? `${onlineMembers.length} online / ` : ''
    let members = guild.members
    membersToShow += members.length

    if (online) {
      members = onlineMembers
    }

    if (level) {
      members = members.sort((member1, member2) => member2.level - member1.level)
    }

    members = members.map(member => [
      member.rank, member.name, member.nick || '', member.vocation, member.level, member.joined, member.status
    ])

    cli.action.stop()
    drawTable('Guild Info', [guild.guildInfo])
    drawTable(`Members (${membersToShow})`, ...members)
    drawTable('Invitations', ...guild.invitations.map(invitation => [invitation.name, invitation.invitationDate]))
  }
}

GuildCommand.description = 'Get the information from the guild at tibia.com'

GuildCommand.flags = {
  name: flags.string({ char: 'n', description: 'name guild to get data' }),
  online: flags.boolean({ char: 'o', description: 'only show online members in the list' }),
  level: flags.boolean({ char: 'l', description: 'show member list sorted by level' })
}

module.exports = GuildCommand
