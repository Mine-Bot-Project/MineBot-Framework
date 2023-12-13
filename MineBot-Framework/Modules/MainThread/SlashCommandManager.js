const { REST, Routes } = require('discord.js');

//Slash Command Manager
module.exports = class {
  #Core

  #commands = []

  constructor (Core) {
    this.#Core = Core
  }

  //Add Command
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
    Object.keys(options.nameLocalizations).forEach((item) => {
      if (!supportedLocales.includes(item)) throw new Error(`Unsupported Locale "${item}" (options.nameLocalizations)`)
    })
    if (typeof options.description !== 'string') throw new Error(`Parameter "options.description" Must Be A <string>`)
    if (typeof options.descriptionLocalizations !== 'object') throw new Error(`Parameter "options.descriptionLocalizations" Must Be A <object>`)
    Object.keys(options.descriptionLocalizations).forEach((item) => {
      if (!supportedLocales.includes(item)) throw new Error(`Unsupported Locale "${item}" (options.descriptionLocalizations)`)
    })
    if (!Array.isArray(options.options)) throw new Error(`Parameter "options.options" Must Be A <array>`)

    options.forEach((item, index) => {
      if (typeof item !== 'object') throw new Error(`Parameter "options[${index}]" Must Be A <object>`)

      item = mergeObject({
        type: undefined,
        name: undefined,
        nameLocalizations: {},
        description: undefined,
        descriptionLocalizations: {},
        autocomplete: false,
        required: false
      }, item)

      if (!Object.keys(optionTypes).includes(item.type)) throw new Error(`Parameter "options.options[${index}].type" Must Be ${Object.keys(optionTypes).map((item2) => `"${item2}"`).join(' Or ')}`)
      if (typeof item.name !== 'string') throw new Error(`Parameter "options.options[${index}].name" Must Be A <string>`)
      if (typeof item.nameLocalizations !== 'object') throw new Error(`Parameter "options.options[${index}].nameLocalizations" Must Be A <object>`)
      Object.keys(item.nameLocalizations).forEach((item2) => {
        if (!supportedLocales.includes(item2)) throw new Error(`Unsupported Locale "${item2}" (options.options[${index}].nameLocalizations)`)
      })
      if (typeof item.description !== 'string') throw new Error(`Parameter "options.options[${index}].description" Must Be A <string>`)
      if (typeof item.descriptionLocalizations !== 'object') throw new Error(`Parameter "options.options[${index}].descriptionLocalizations" Must Be A <object>`)
      Object.keys(item.descriptionLocalizations).forEach((item2) => {
        if (!supportedLocales.includes(item2)) throw new Error(`Unsupported Locale "${item2}" (options.options[${index}].descriptionLocalizations)`)
      })
      if (typeof item.autocomplete !== 'boolean') throw new Error(`Parameter "options.options[${index}].autocomplete" Must Be A <boolean>`)
      if (typeof item.required !== 'boolean') throw new Error(`Parameter "options.options[${index}].required" Must Be A <boolean>`)
    })

    if (this.#checkCommandName(options.name)) throw new Error(`Command Named "${options.name}" Already Exist`)
    Object.keys(options.nameLocalizations).forEach((item) => {
      if (this.#checkCommandName(options.nameLocalizations[item])) throw new Error(`Command Named "${options.nameLocalizations[item]}"(${item}) Already Exist`)
    })

    commands.push({
      name: options.name,
      name_localizations: options.nameLocalizations,
      description: options.description,
      description_localizations: options.descriptionLocalizations,
      options: options.options
    })
  }

  //Remove Command
  removeCommand (name) {
    for (let i = this.#commands.length-1; i >= 0; i--) {
      if (this.#commands[i].name === name) this.#commands.splice(i, 1)
    }
  }

  //Load Commands
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
    for (let item of commands) {
      if (item.name === name) return true

      for (let item2 of Object.keys(item.name_localizations)) {
        if (item.name_localizations[item2] === name) return true
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
