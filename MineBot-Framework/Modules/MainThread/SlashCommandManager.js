const { REST, Routes } = require('discord.js');

// Slash Command Manager
module.exports = class {
  #Core

  #commands = []

  constructor (Core) {
    this.#Core = Core
  }

  // Add Command
  addCommand (options) {
    options = mergeObject({
      name: undefined,
      nameLocalizations: {},
      description: undefined,
      descriptionLocalizations: {},
      options: []
    }, options)

    if (typeof options.name !== 'string') throw new Error(`Parameter "options.name" Must Be A <string>`)
    if (typeof options.nameLocalizations !== 'object') throw new Error(`Parameter "options.nameLocalizations" Must Be A <object>`)
    Object.keys(options.nameLocalizations).forEach((key) => {
      if (!supportedLocales.includes(key)) throw new Error(`Unsupported Locale "${key}" (options.nameLocalizations)`)
    })
    if (typeof options.description !== 'string') throw new Error(`Parameter "options.description" Must Be A <string>`)
    if (typeof options.descriptionLocalizations !== 'object') throw new Error(`Parameter "options.descriptionLocalizations" Must Be A <object>`)
    Object.keys(options.descriptionLocalizations).forEach((key) => {
      if (!supportedLocales.includes(key)) throw new Error(`Unsupported Locale "${key}" (options.descriptionLocalizations)`)
    })
    if (!Array.isArray(options.options)) throw new Error(`Parameter "options.options" Must Be A <array>`)

    options.options.forEach((option, index) => {
      if (typeof key !== 'object') throw new Error(`Parameter "options.options[${index}]" Must Be A <object>`)

      item = mergeObject({
        type: undefined,
        name: undefined,
        nameLocalizations: {},
        description: undefined,
        descriptionLocalizations: {},
        autocomplete: false,
        required: false
      }, item)

      if (!Object.keys(optionTypes).includes(option.type)) throw new Error(`Parameter "options.options[${index}].type" Must Be ${Object.keys(optionTypes).map((item2) => `"${item2}"`).join(' Or ')}`)
      if (typeof option.name !== 'string') throw new Error(`Parameter "options.options[${index}].name" Must Be A <string>`)
      if (typeof option.nameLocalizations !== 'object') throw new Error(`Parameter "options.options[${index}].nameLocalizations" Must Be A <object>`)
      Object.keys(option.nameLocalizations).forEach((key) => {
        if (!supportedLocales.includes(key)) throw new Error(`Unsupported Locale "${key}" (options.options[${index}].nameLocalizations)`)
      })
      if (typeof option.description !== 'string') throw new Error(`Parameter "options.options[${index}].description" Must Be A <string>`)
      if (typeof option.descriptionLocalizations !== 'object') throw new Error(`Parameter "options.options[${index}].descriptionLocalizations" Must Be A <object>`)
      Object.keys(option.descriptionLocalizations).forEach((key) => {
        if (!supportedLocales.includes(key)) throw new Error(`Unsupported Locale "${key}" (options.options[${index}].descriptionLocalizations)`)
      })
      if (typeof option.autocomplete !== 'boolean') throw new Error(`Parameter "options.options[${index}].autocomplete" Must Be A <boolean>`)
      if (typeof option.required !== 'boolean') throw new Error(`Parameter "options.options[${index}].required" Must Be A <boolean>`)
    })

    if (this.#checkCommandName(options.name)) throw new Error(`Command Named "${options.name}" Already Exist`)
    Object.keys(options.nameLocalizations).forEach((key) => {
      if (this.#checkCommandName(options.nameLocalizations[key])) throw new Error(`Command Named "${options.nameLocalizations[key]}"(${key}) Already Exist`)
    })

    commands.push({
      name: options.name,
      name_localizations: options.nameLocalizations,
      description: options.description,
      description_localizations: options.descriptionLocalizations,
      options: options.options
    })
  }

  // Remove Command
  removeCommand (name) {
    for (let i = this.#commands.length-1; i >= 0; i--) {
      if (this.#commands[i].name === name) this.#commands.splice(i, 1)
    }
  }

  // Load Commands
  async loadCommands () {
    let state = this.#Core.Log.addState('white', 'Slash Command Manager', `Loading Commands (${this.#commands.length})`)

    let start = performance.now()

    const rest = new REST().setToken(this.#Core.options.token)

    const data = await rest.put(
			Routes.applicationCommands(this.#Core.options.clientID),
			{ body: this.#commands }
		)

    this.#Core.Log.finishState(state, 'green', `Successfully Loaded ${data.length} Commands (Time: ${parseInt((performance.now()-start)/60000).toFixed(1)})`)
  }

  #checkCommandName (name) {
    for (let command of this.#commands) {
      if (command.name === name) return true

      for (let locale of Object.keys(command.name_localizations)) {
        if (command.name_localizations[locale] === name) return true
      }
    }

    return false
  }
}

const mergeObject = require('../Tools/MergeObject')

const supportedLocales = ['id', 'da', 'de', 'en-GB', 'en-US', 'es-ES', 'fr', 'hr', 'it', 'lt', 'hu', 'nl', 'no', 'pl', 'pt-BR', 'ro', 'fi', 'sv-SE', 'vi', 'tr', 'cs', 'el', 'bg', 'ru', 'uk', 'hi', 'th', 'zh-CN', 'ja', 'zh-TW', 'ko']
const optionTypes = {
  'string': 3,
  'number': 4,
  'boolean': 5,
  'channel': 7,
  'user': 6
}
