@tibia-suite/cli
================

A CLI to get information from tibia.com in console

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@tibia-suite/cli.svg)](https://npmjs.org/package/@tibia-suite/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@tibia-suite/cli.svg)](https://npmjs.org/package/@tibia-suite/cli)
[![License](https://img.shields.io/npm/l/@tibia-suite/cli.svg)](https://github.com/joseglego/tibia-suite/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tibia-suite/cli
$ @tibia-suite/cli COMMAND
running command...
$ @tibia-suite/cli (-v|--version|version)
@tibia-suite/cli/0.1.0 darwin-x64 node-v14.3.0
$ @tibia-suite/cli --help [COMMAND]
USAGE
  $ @tibia-suite/cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`@tibia-suite/cli character`](#tibia-suitecli-character)
* [`@tibia-suite/cli guild`](#tibia-suitecli-guild)
* [`@tibia-suite/cli guilds`](#tibia-suitecli-guilds)
* [`@tibia-suite/cli help [COMMAND]`](#tibia-suitecli-help-command)
* [`@tibia-suite/cli world`](#tibia-suitecli-world)
* [`@tibia-suite/cli worlds`](#tibia-suitecli-worlds)

## `@tibia-suite/cli character`

Get the information from the character at tibia.com

```
USAGE
  $ @tibia-suite/cli character

OPTIONS
  -m, --minified   show only character info without extend data
  -n, --name=name  name character to get data
```

_See code: [src/commands/character.js](https://github.com/joseglego/tibia-suite/blob/v0.1.0/src/commands/character.js)_

## `@tibia-suite/cli guild`

Get the information from the guild at tibia.com

```
USAGE
  $ @tibia-suite/cli guild

OPTIONS
  -l, --level      show member list sorted by level
  -n, --name=name  name guild to get data
  -o, --online     only show online members in the list
```

_See code: [src/commands/guild.js](https://github.com/joseglego/tibia-suite/blob/v0.1.0/src/commands/guild.js)_

## `@tibia-suite/cli guilds`

List the guilds of a world

```
USAGE
  $ @tibia-suite/cli guilds

OPTIONS
  -f, --filter=filter  find by (part of the) name
  -i, --insensitive    find is insensitive
  -s, --server=server  (required) server where the guilds are
```

_See code: [src/commands/guilds.js](https://github.com/joseglego/tibia-suite/blob/v0.1.0/src/commands/guilds.js)_

## `@tibia-suite/cli help [COMMAND]`

display help for @tibia-suite/cli

```
USAGE
  $ @tibia-suite/cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `@tibia-suite/cli world`

Describe the command here

```
USAGE
  $ @tibia-suite/cli world

OPTIONS
  -l, --level      sort online characters by level
  -n, --name=name  name of the selected world
  -v, --vocation   group online characters by vocation

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/world.js](https://github.com/joseglego/tibia-suite/blob/v0.1.0/src/commands/world.js)_

## `@tibia-suite/cli worlds`

Get the list of worlds from tibia.com

```
USAGE
  $ @tibia-suite/cli worlds

OPTIONS
  -l, --location=eu|na|sa  filter by location
  -o, --online             order by amounf of online characters
```

_See code: [src/commands/worlds.js](https://github.com/joseglego/tibia-suite/blob/v0.1.0/src/commands/worlds.js)_
<!-- commandsstop -->
