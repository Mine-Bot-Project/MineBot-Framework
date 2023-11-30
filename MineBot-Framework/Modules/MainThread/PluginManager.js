//Plugin Manager
module.exports = class {
  #core

  constructor (core) {
    this.#core = core

    this.plugins = {}
  }

  //Add Plugin
  addPlugin (Plugin) {
    if (Plugin.id === undefined || Plugin.path === undefined) throw new Error('Could Not Verify Plugin')
    if (Plugin.init !== undefined && typeof Plugin.init !== 'function') throw new Error(`Failed To Initialize Plugin: ${Plugin.id} (Not A Function)`)
    if (typeof Plugin.pages !== 'function') throw new Error('Failed To Register Plugin Pages')

    if (this.plugins[Plugin.id] === undefined) this.plugins[Plugin.id] = Plugin
    else throw new Error(`Plugin Is Already Added: ${Plugin.id}`)
  }

  //Remove Plugin
  removePlugin (id) {
    if (this.plugins[id] === undefined) throw new Error(`Plugin Not Found: ${id}`)

    delete this.plugins[id]
  }

  //Load Plugins
  loadPlugins () {
    if (Object.keys(this.plugins).length > 0) {
      this.#core.log.addSpace()

      let state = this.#core.log.addState('white', 'Plugin Manager', `Load Plugins (${Object.keys(this.plugins)})`)
      
      this.#core.log.addSpace()

      let start = performance.now()
      let loadTime = {}

      Object.keys(this.plugins).forEach((item) => {
        loadTime[item] = performance.now()

        this.plugins[item].init(this.#core)

        loadTime[item] = parseInt((performance.now()-loadTime[item])/60000).toFixed(1)
      })

      this.#core.log.finishState(state, 'green', `Successfully Loaded Plugins (${parseInt((performance.now()-start)/60000).toFixed(1)}s)\n\n${Object.keys(loadTime).map((item) => `${item}: ${loadTime[item]}s`).join('\n')}`)
    }
  }
}
