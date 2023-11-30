const wcwidth = require('wcwidth')

//Command Line Interface
module.exports = class {
  constructor (core) {
    this.cli = new CLI()
    core.log = new Log()

    this.cli.addPage('Logs', () => core.log.getLogs())
  }
}

const { CLI } = require('../Tools/DynamicCLI')

const Log = require('./Log')
