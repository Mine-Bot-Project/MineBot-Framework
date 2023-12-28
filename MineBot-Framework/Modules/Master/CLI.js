const wcwidth = require('wcwidth')

// Command Line Interface
module.exports = class {
  #commands = {
    'stop': { parameters: [], flags: [{ name: '-ds', description: 'Do not save the database' }], description: 'Stop the bot', callback: () => {
      process.exit()
    }}
  }

  #commandsSuggestion = []

  constructor (Core) {
    this.DynamicCLI = new DynamicCliBuilder()
    Core.Log = new Log(Core)

    this.DynamicCLI.addPage('Logs', 'Logs', () => Core.Log.getLogs())
    this.DynamicCLI.addPage('Commands', 'Commands', () => {
      let longestLength = 0

      this.#commandsSuggestion.forEach((commandName) => {
        let string = `${commandName}${(this.#commands[commandName].parameters.length > 0) ? ` ${this.#commands[commandName].parameters.join(' ')}` : ''}`

        if (wcwidth(string) > longestLength) longestLength = wcwidth(string)

        this.#commands[commandName].flags.forEach((flag) => {
          if (wcwidth(`| ${flag.name}`) > longestLength) longestLength = wcwidth(`| ${flag.name}`)
        })
      })

      let lines = []

      this.#commandsSuggestion.forEach((commandName) => {
        let string = `${commandName}${(this.#commands[commandName].parameters.length > 0) ? ` ${this.#commands[commandName].parameters.join(' ')}` : ''}`

        lines.push(`${string}${' '.repeat(longestLength-wcwidth(string))} | ${this.#commands[commandName].description}`)

        this.#commands[commandName].flags.forEach((flag) => {
          lines.push(`| ${flag.name}${' '.repeat(longestLength-wcwidth(`| ${flag.name}`))} | ${flag.description}`)
        })
      })

      return lines
    })
    this.DynamicCLI.addPage('System', 'System', () => {
      let threads = []

      Object.keys(Core.ClusterManager.clusters).forEach((id) => {
        threads.push(`| [${id}] Delay: ${getNumberWithTimeUnit(Core.ClusterManager.clusters[id].info.delay)} - Last Message: ${Core.ClusterManager.clusters[id].info.lastMessage}`)
      })

      return [
        `Uptime: ${getNumberWithTimeUnit(performance.now())}`,
        '',
        'Info:',
        `| Framework Version: ${Core.frameworkInfo.version}`,
        `| Plugins: ${Object.keys(Core.PluginManager.plugins).length}`,
        '',
        `Clusters: (${Object.keys(Core.ClusterManager.clusters).length})`
      ].concat(threads)
    })

    this.DynamicCLI.listen('input', (data) => {
      if (data.toString('hex') === '09') {
        if (this.#commandsSuggestion.length > 0) this.DynamicCLI.input = `${this.#commandsSuggestion[0]} `
        else this.DynamicCLI.input = ''
      } else {
        this.#getCommandsSuggestion(this.DynamicCLI.input)

        this.DynamicCLI.switchPage('Commands')
      }
    })

    this.DynamicCLI.listen('enter', (data) => {
      let command = parseCommand(data)

      this.DynamicCLI.switchPage('Logs')

      if (this.#commands[command.name] === undefined) Core.Log.add('error', `Command Not Found: ${command.name}`)
      else this.#commands[command.name].callback(command.parameters, command.flags)
      
      this.DynamicCLI.input = ''

      this.#getCommandsSuggestion('')
    })

    this.#getCommandsSuggestion('')
  }

  get commands () {return Object.keys(this.#commands)}

  // Add Command
  addCommand (name, parameters, flags, description, callback) {
    if (this.#commands[name] !== undefined) throw new Error(`Command Named "${name}" Already Exist`)

    if (name.includes(' ')) throw new Error(`Command Name Cannot Contain Spaces`)

    this.#commands[name] = {
      parameters: (parameters === undefined) ? [] : parameters,
      flags: (flags === undefined) ? [] : flags,
      description,
      callback
    }
  }

  // Remove Command
  removeCommand (name) {
    if (this.#commands[name] === undefined) throw new Error(`Command Named "${name}" Not Found`)

    delete this.#commands[name]
  }

  // Get Command Suggestion
  #getCommandsSuggestion (data) {
    this.#commandsSuggestion = []

    Object.keys(this.#commands).forEach((item) => {
      if (item.substring(0, data.length) === data) this.#commandsSuggestion.push(item)
    })
  }
}

const getNumberWithTimeUnit = require('../Tools/GetNumberWithTimeUnit')
const { DynamicCliBuilder } = require('../Tools/DynamicCliBuilder')

const Log = require('./Log')

// Parse Command
function parseCommand (text) {
  let data = { name: undefined, parameters: [], flags: [] }

  text.split(' ').forEach((chunk) => {
    if (chunk[0] === '-') data.flags.push(chunk)
    else {
      if (data.name === undefined) data.name = chunk
      else command.parameters.push(chunk)
    }
  })

  return data
}
