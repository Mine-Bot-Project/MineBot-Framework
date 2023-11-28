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

		this.plugin = new PluginManager(this)
		//this.cli = new CLI(this)

    fs.readdirSync(getPath(__dirname, ['<', '<', 'Plugins'])).forEach((item) => this.plugin.addPlugin(require(getPath(__dirname, ['<', '<', 'Plugins', item]))))

		//this.clusters = new ClusterManager(this)
	}

	get path () {return this.#path}
	get options () {return this.#options}
	get state () {return this.#state}

	//Start The Bot
	start () {
    if (this.#state === 'idle') {
			this.plugin.loadPlugins()
      
      this.workerManager = new WorkerManager()
			this.clusterManager = new ClusterManager(this)
		} else throw new Error(`Could Not Start The Bot (State: ${this.#state})`)
	}
}

const getPath = require('../Tools/GetPath')

const ClusterManager = require('./ClusterManager')
const PluginManager = require('./PluginManager')
const WorkerManager = require('./WorkerManager')
const CLI = require('./CLI')
