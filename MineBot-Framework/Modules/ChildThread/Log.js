// Log
module.exports = class {
  // Add Log
  async add (type, content) {
    await Core.Cluster.callFunction('Log.add', [type, content])
  }
  
  // Add Space
  async addSpace () {
    await Core.Cluster.callFunction('Log.addSpace', [])
  }

  // Add State
  async addState (color, title, content, parentID) {
    return await Core.Cluster.callFunction('Log.addState', [color, title, content, parentID])
  }

  // Change State
  async changeState (id, color, content) {
    await Core.Cluster.callFunction('Log.changeState', [id, color, content])
  }

  // Finish State
  async finishState (id, color, content) {
    await Core.Cluster.callFunction('Log.finishState', [id, color, content])
  }
}

const Core = require('./Core')
