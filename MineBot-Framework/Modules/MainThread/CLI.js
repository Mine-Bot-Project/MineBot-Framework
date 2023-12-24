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

      this.#commandsSuggestion.forEach((item) => {
        let string = `${item}${(this.#commands[item].parameters.length > 0) ? ` ${this.#commands[item].parameters.join(' ')}` : ''}`

        if (wcwidth(string) > longestLength) longestLength = wcwidth(string)

        this.#commands[item].flags.forEach((item2) => {
          if (wcwidth(`| ${item2.name}`) > longestLength) longestLength = wcwidth(`| ${item2.name}`)
        })
      })

      let lines = []

      this.#commandsSuggestion.forEach((item) => {
        let string = `${item}${(this.#commands[item].parameters.length > 0) ? ` ${this.#commands[item].parameters.join(' ')}` : ''}`

        lines.push(`${string}${' '.repeat(longestLength-wcwidth(string))} | ${this.#commands[item].description}`)

        this.#commands[item].flags.forEach((item) => {
          lines.push(`| ${item.name}${' '.repeat(longestLength-wcwidth(`| ${item.name}`))} | ${item.description}`)
        })
      })

      return lines
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

const { DynamicCliBuilder } = require('../Tools/DynamicCliBuilder')

const Log = require('./Log')

// Parse Command
function parseCommand (text) {
  let data = { name: undefined, parameters: [], flags: [] }

  text.split(' ').forEach((item) => {
    if (item[0] === '-') data.flags.push(item)
    else {
      if (data.name === undefined) data.name = item
      else command.parameters.push(item)
    }
  })

  return data
}
