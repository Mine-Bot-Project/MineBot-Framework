const { ClusterManager } = require('discord-hybrid-sharding')
const path = require('path')

//Cluster Manager
module.exports = class {
  #core

  constructor (core) {
    this.#core = core
  }

  //Spawn Clusters
  spawn () {
    return new Promise(resolve => {
      let state = this.#core.Log.addState('white', 'Cluster Manager', 'Starting Clusters')
      
      let start = performance.now()

      this.manager = new ClusterManager(path.resolve(__dirname, '../ChildThread/Main.js'), {
        token: this.#core.options.token,

        totalClusters: this.#core.options.clusters,

        mode: 'worker'
      })

      let count = 0

      this.manager.on('clusterCreate', (cluster) => {
        this.#core.WorkerManager.addWorker(cluster)

        count++
        if (count >= this.manager.totalClusters) resolve()
      })

      this.manager.spawn()
    })
  }
}
