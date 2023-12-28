require('./Modules/Master/CheckEnvironment')()

const Core = require('./Modules/Master/Core')

// Bot
class Bot {
  #core

  constructor (path, options) {
    this.#core = new Core(path, options)
  }

  // Start The Bot
  async start () {
    await this.#core.start()
  }

  // Add Plugin
  addPlugin (Plugin) {
    this.#core.PluginManager.addPlugin(Plugin)  
  }
}

module.exports = { Bot, Core }
