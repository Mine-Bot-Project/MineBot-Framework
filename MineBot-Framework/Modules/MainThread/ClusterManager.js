const { ClusterManager } = require('discord-hybrid-sharding')
const path = require('path')

//Cluster Manager
module.exports = class {
  #core

  constructor (core) {
    this.#core = core
    this.functions = {}
  }

  //Spawn Clusters
  spawn () {
    this.manager = new ClusterManager(path.resolve(__dirname, '../ChildThread/Main.js'), {
      token: this.#core.options.token,

      totalClusters: this.#core.options.clusters,

      mode: 'worker'
    })

    this.manager.on('clusterCreate', (cluster) => {
      this.#core.WorkerManager.addWorker(cluster)
    })

    this.manager.spawn()
  }
}
