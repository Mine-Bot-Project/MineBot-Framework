const { ClusterManager } = require('discord-hybrid-sharding')

//Cluster
module.exports = class {
	#core

  constructor (core) {
	  this.#core = core
		this.functions = {}
	}

	//Spawn Clusters
	spawn () {
		this.manager = new ClusterManager(getPath(__dirname, ['<', 'ChildThread', 'Main.js']), {
			token: this.#core.options.token,

			mode: 'worker'
		})

		this.manager.on('clusterCreate', (cluster) => {
			this.#core.workerManager.addWorker(cluster)
		})

		this.manager.spawn()
	}
}

const getPath = require('../Tools/GetPath')

const WorkerManager = require('./WorkerManager')
