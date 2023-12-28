const { ClusterManager } = require('discord-hybrid-sharding')
const path = require('path')

// Cluster Manager
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.Event = new Event()

    this.clusters = {}
    this.functions = {}

    Core.Timer.createInterval(1000, () => {
      Object.keys(this.clusters).forEach((id) => {
        console.log(this.clusters[id].cluster.send({ type: 'getDelay', id, startTime: performance.now() }))
      })
    })
  }

  // Spawn Clusters
  spawn () {
    return new Promise(async (resolve) => {
      let state = this.#Core.Log.addState('white', 'Cluster Manager', 'Starting Clusters')
      
      let start = performance.now()

      this.manager = new ClusterManager(path.resolve(__dirname, '../Cluster/Main.js'), {
        token: this.#Core.options.token,

        totalClusters: this.#Core.options.clusters,

        mode: 'worker'
      })

      let count = 0

      this.Event.listen(this.manager, 'clusterCreate', (cluster) => {
        let id = generateID(5, Object.keys(this.clusters))

        this.clusters[id] = { info: { delay: 0, lastMessage: 'None' }, cluster }

        this.Event.listen(this.clusters[id].cluster, 'message', (msg) => this.#messageHandler(msg, id))

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

  // Register Function (Functions that can be called from other worker thread)
  registerFunction (name, callback) {
    if (this.functions[name] !== undefined) throw new Error(`Function Name Is Already Used: ${callback}`)
  
    this.functions[name] = callback
  }

  // Message Handler
  async #messageHandler (msg, id) {
    this.clusters[id].info.lastMessage = msg.type

    if (msg.type === 'setDelay') this.clusters[id].info.delay = Math.trunc(performance.now()-msg.startTime)
    else if (msg.type === 'callFunction') {
      if (this.functions[msg.name] === undefined) msg.reply({ error: true, content: 'Function Not Found' })
      else {
        try {
          msg.reply({ error: false, data: await this.functions[msg.name](...msg.parameters) })
        } catch (error) {
          msg.reply({ error: true, content: error.stack })
        }
      }
    }
  }

}

const generateID = require('../Tools/GenerateID')
const Event = require('../Tools/Event')

