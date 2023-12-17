const { ClusterManager } = require('discord-hybrid-sharding')
const path = require('path')

// Cluster Manager
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.Event = new Event()
  }

  // Spawn Clusters
  spawn () {
    return new Promise(async (resolve) => {
      let state = this.#Core.Log.addState('white', 'Cluster Manager', 'Starting Clusters')
      
      let start = performance.now()

      this.manager = new ClusterManager(path.resolve(__dirname, '../ChildThread/Main.js'), {
        token: this.#Core.options.token,

        totalClusters: this.#Core.options.clusters,

        mode: 'worker'
      })

      let count = 0

      this.Event.listen(this.manager, 'clusterCreate', (cluster) => {
        this.#Core.WorkerManager.addWorker(cluster)

        let state2 = this.#Core.Log.addState('white', cluster.id, 'Starting Cluster', state)

        cluster.on('message', (msg) => {
          if (msg.type === 'ready') {
            this.#Core.Log.finishState(state2, 'green', 'Cluster Ready')

            count--
            if (count === 0) {
              this.#Core.Log.finishState(state, 'green', `Successfully Started Clusters (${parseInt((performance.now()-start)/60000).toFixed(1)}s)`)

              resolve()
            }
          }
        })

        count++
      })

      this.manager.spawn()
    })
  }
}

const Event = require('../Tools/Event')
