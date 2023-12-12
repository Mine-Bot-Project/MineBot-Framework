//Command Manager
module.export = class {
  #commands = []

  constructor (core) {
    
  }

  //Add Command
  addCommand (options) {
    options = mergeObject({
      name: undefined,
      nameLocalizations: {},
      description: undefined,
      descriptionLocalizations: {},
    }, options)
  }

  //Remove Command
  removeCommand (id) {

  }
}

const mergeObject = require('../Tools/MergeObject')
