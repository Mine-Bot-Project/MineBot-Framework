const path = require('path')
const fs = require('fs')

// System Core (Main Thread)
module.exports = class {
  #dataPath
  #options

  #state = 'idle'
  #frameworkInfo
  #info

  constructor (dataPath, options) {
    if (!fs.existsSync(dataPath)) throw new Error(`Directory Not Found ${dataPath}`)
    if (!fs.statSync(dataPath).isDirectory()) throw new Error(`${dataPath} Is Not A Directory`)

    this.#dataPath = dataPath
    this.#options = Object.assign({
      token: undefined,
      clientID: undefined,

      clusters: 1
    }, options)

    this.checkFiles()

    this.#frameworkInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../Info.json')))
    this.#info = JSON.parse(fs.readFileSync(path.resolve(dataPath, 'Info.json')))

    this.Timer = new Timer()

    this.TranslationManager = new TranslationManager(this)
    this.SlashCommandManager = new SlashCommandManager(this)
    this.ClusterManager = new ClusterManager(this)
    this.WorkerManager = new WorkerManager(this)

    this.PluginManager = new PluginManager(this)

    this.CLI = new CLI(this)

    this.Log.add('info', `Framework Version: ${info.version}`)

    fs.readdirSync(path.resolve(__dirname, '../../Plugins')).forEach((plugin) => this.PluginManager.addPlugin(require(path.resolve(__dirname, `../../Plugins/${plugin}`))))
  }

  get dataPath () {return this.#dataPath}
  get options () {return this.#options}
  get state () {return this.#state}
  get frameworkInfo () {return this.#frameworkInfo}
  get info () {return this.#info}

  // Start The Bot
  async start () {
    if (this.#state === 'idle') {
      this.Log.add('running', 'Starting The Bot')

      this.PluginManager.loadPlugins()

      this.TranslationManager.load()
      await Promise.all([
        this.SlashCommandManager.loadCommands(),
        this.ClusterManager.spawn()
      ])

      this.Log.add('complete', 'Successfully Started The Bot')
    } else throw new Error(`Could Not Start The Bot (State: ${this.#state})`)
  }

  // Check Files
  checkFiles () {    
    if (!fs.existsSync(path.resolve(this.#dataPath, 'Info.json'))) fs.writeFileSync(path.resolve(this.#dataPath, 'Info.json'), JSON.stringify({ servers: [], defaultLanguage: 'zh-TW' }, null, 2))
    if (!fs.existsSync(path.resolve(this.#dataPath, 'Servers'))) fs.mkdirSync(path.resolve(this.#dataPath, 'Servers'))
  }
}

const Timer = require('../Tools/Timer')

const SlashCommandManager = require('./SlashCommandManager')
const TranslationManager = require('./TranslationManager')
const ClusterManager = require('./ClusterManager')
const PluginManager = require('./PluginManager')
const WorkerManager = require('./WorkerManager')
const CLI = require('./CLI')

const info = require('../../Info.json')
