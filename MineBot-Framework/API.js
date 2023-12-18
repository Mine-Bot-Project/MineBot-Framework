require('./Modules/MainThread/CheckEnvironment')()

//API
module.exports = class {
  #core

  constructor (path, options) {
    this.#core = new Core(path, options)
  }

  //Start The Bot
  start () {
    this.#core.start()
  }

  //Add Plugin
  addPlugin (Plugin) {
    this.#core.PluginManager.addPlugin(Plugin)  
  }
}

const Core = require('./Modules/MainThread/Core')
