const wcwidth = require('wcwidth')

//Command Line Interface
module.exports = class {
  constructor (core) {
    //this.CLI = new CLI()
    core.Log = new Log(core)

    //this.CLI.addPage('Logs', () => core.Log.getLogs())
  }
}

const { CLI } = require('../Tools/DynamicCLI')

const Log = require('./Log')
