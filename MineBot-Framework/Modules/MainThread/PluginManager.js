//Plugin Manager
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.plugins = {}
  }

  //Add Plugin
  addPlugin (Plugin) {
    if (Plugin.id === undefined || Plugin.path === undefined) throw new Error('Could Not Verify Plugin')
    if (Plugin.init !== undefined && typeof Plugin.init !== 'function') throw new Error(`Failed To Initialize Plugin: ${Plugin.id} (Not A Function)`)
    if (typeof Plugin.content !== 'function') throw new Error('Failed To Register Plugin Content')

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
      let state = this.#Core.Log.addState('white', 'Plugin Manager', `Load Plugins (${Object.keys(this.plugins)})`)

      let start = performance.now()

      Object.keys(this.plugins).forEach((item) => this.plugins[item].init(this.#Core))

      this.#Core.Log.finishState(state, 'green', `Successfully Loaded Plugins (Time: ${parseInt((performance.now()-start)/60000).toFixed(1)}s)`)
    }
  }
}
