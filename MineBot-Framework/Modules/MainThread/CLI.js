//Command Line Interface
module.exports = class {
  constructor (Core) {
    this.CLI = new CLI()
    Core.Log = new Log(Core)

    this.CLI.addPage('Logs', () => Core.Log.getLogs())
  }
}

const { CLI } = require('../Tools/DynamicCLI')

const Log = require('./Log')
