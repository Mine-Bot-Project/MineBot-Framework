const { ClusterManager } = require('discord-hybrid-sharding')

//Cluster
module.exports = class {
  constructor (core) {
		this.manager = new ClusterManager(getPath(__dirname, ['<', 'ChildThread', 'Main.js']), {
			token: core.options.token,

			mode: 'worker'
		})

		this.manager.on('clusterCreate', (cluster) => {
			new Worker
      console.log(cluster.THREAD)
		})

		this.manager.spawn()
	}
}

const getPath = require('../Tools/GetPath')

const WorkerManager = require('./WorkerManager')
