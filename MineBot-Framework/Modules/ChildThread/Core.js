const Cluster = require('./Cluster')
const Log = require('./Log')

// System Core (Child Thread)
module.exports = new class {
  #info

  constructor () {
    this.Cluster = new Cluster()
    
    this.Log = new Log()
  }
}
