const fs = require('fs')

//System Core
module.exports = class {
  #path
  #options

  #state = 'idle'

  constructor (path, options) {
    if (!fs.existsSync(path)) throw new Error(`Directory Not Found ${path}`)
    if (!fs.statSync(path).isDirectory()) throw new Error(`${path} Is Not A Directory`)

    this.#path = path
    this.#options = Object.assign({
      token: undefined,
      clientID: undefined,
    }, options)

    this.ClusterManager = new ClusterManager(this)
    this.WorkerManager = new WorkerManager(this)

    this.Plugin = new PluginManager(this)
    this.CLI = new CLI(this)

    this.Log.add('info', `Framework Version: ${info.version}`)

    fs.readdirSync(getPath(__dirname, ['<', '<', 'Plugins'])).forEach((item) => this.Plugin.addPlugin(require(getPath(__dirname, ['<', '<', 'Plugins', item]))))
  }

  get path () {return this.#path}
  get options () {return this.#options}
  get state () {return this.#state}

  //Start The Bot
  start () {
    if (this.#state === 'idle') {
      this.Log.add('running', 'Starting The Bot')

      this.Plugin.loadPlugins()

      this.ClusterManager.spawn()

      this.Log.add('complete', 'Successfully Started The Bot')
    } else throw new Error(`Could Not Start The Bot (State: ${this.#state})`)
  }
}

const getPath = require('../Tools/GetPath')

const ClusterManager = require('./ClusterManager')
const PluginManager = require('./PluginManager')
const WorkerManager = require('./WorkerManager')
const CLI = require('./CLI')

const info = require('../../Info.json')
