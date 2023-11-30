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

    this.clusterManager = new ClusterManager(this)
    this.workerManager = new WorkerManager(this)

    this.plugin = new PluginManager(this)
    this.cli = new CLI(this)

    this.log.add('info', `Framework Version: ${info.version}`)
    this.log.addSpace()

    fs.readdirSync(getPath(__dirname, ['<', '<', 'Plugins'])).forEach((item) => this.plugin.addPlugin(require(getPath(__dirname, ['<', '<', 'Plugins', item]))))
  }

  get path () {return this.#path}
  get options () {return this.#options}
  get state () {return this.#state}

  //Start The Bot
  start () {
    if (this.#state === 'idle') {
      this.log.add('running', 'Starting The Bot')

      this.plugin.loadPlugins()

      this.clusterManager.spawn()

      this.log.add('complete', 'Successfully Started The Bot')
    } else throw new Error(`Could Not Start The Bot (State: ${this.#state})`)
  }
}

const getPath = require('../Tools/GetPath')

const ClusterManager = require('./ClusterManager')
const PluginManager = require('./PluginManager')
const WorkerManager = require('./WorkerManager')
const CLI = require('./CLI')

const info = require('../../Info.json')
