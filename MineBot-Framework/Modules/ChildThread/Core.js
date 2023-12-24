const Cluster = require('./Cluster')

// System Core (Child Thread)
module.exports = new class {
  constructor () {
    this.Cluster = new Cluster()
  }
}
