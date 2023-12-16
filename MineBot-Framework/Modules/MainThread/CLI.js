//Command Line Interface
module.exports = class {
  constructor (Core) {
    this.DynamicCLI = new DynamicCliBuilder()
    Core.Log = new Log(Core)

    this.DynamicCLI.addPage('Logs', 'Logs', () => Core.Log.getLogs())
    this.DynamicCLI.addPage('Commands', 'Commands', () => [])
  }
}

const { DynamicCliBuilder, BackgroundColor } = require('../Tools/DynamicCliBuilder')

const Log = require('./Log')
