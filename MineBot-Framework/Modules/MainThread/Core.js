const path = require('path')
const fs = require('fs')

//System Core (Main Thread)
module.exports = class {
  #dataPath
  #options

  #state = 'idle'

  constructor (dataPath, options) {
    if (!fs.existsSync(dataPath)) throw new Error(`Directory Not Found ${dataPath}`)
    if (!fs.statSync(dataPath).isDirectory()) throw new Error(`${dataPath} Is Not A Directory`)

    this.#dataPath = dataPath
    this.#options = Object.assign({
      token: undefined,
      clientID: undefined,

      clusters: 1
    }, options)

    this.ClusterManager = new ClusterManager(this)
    this.WorkerManager = new WorkerManager(this)

    this.Plugin = new PluginManager(this)
    this.CLI = new CLI(this)

    this.Log.add('info', `Framework Version: ${info.version}`)

    fs.readdirSync(path.resolve(__dirname, '../../Plugins')).forEach((item) => this.Plugin.addPlugin(require(path.resolve(__dirname, `../../Plugins/${item}`))))

    this.checkFiles()
  }

  get dataPath () {return this.#dataPath}
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

  //Check Files
  checkFiles () {    
    if (!fs.existsSync(path.resolve(this.#dataPath, 'Info.json'))) fs.writeFileSync(path.resolve(this.#dataPath, 'Info.json'), '{\n  "servers":[],\n\n  "defaultLanguage": "zh-TW"\n}')
    if (!fs.existsSync(path.resolve(this.#dataPath, 'Servers'))) fs.mkdirSync(path.resolve(this.#dataPath, 'Servers'))
  }
}

const ClusterManager = require('./ClusterManager')
const PluginManager = require('./PluginManager')
const WorkerManager = require('./WorkerManager')
const CLI = require('./CLI')

const info = require('../../Info.json')
