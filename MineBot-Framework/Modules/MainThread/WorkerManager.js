//Worker Manager
module.exports = class {
  #core

  constructor (core) {
    this.#core = core

    this.Event = new Event()

    this.workers = {}
    this.functions = {}
  }

  //Add Worker
  addWorker (Worker) {
    let id = generateID(5, Object.keys(this.workers))

    this.workers[id] = Worker

    this.Event.listen(this.workers[id], 'message', (msg) => this.#messageHandler(msg))
  }

  //Register Function (Functions that can be called from other worker thread)
  registerFunction (name, callback) {
    if (this.functions[name] !== undefined) throw new Error(`Function Name Is Already Used: ${callback}`)
  
    this.functions[name] = callback
  }

  //Message Handler
  #messageHandler (msg) {
    this.#core.Log.add('info', JSON.stringify(msg))
  }
}

const generateID = require('../Tools/GenerateID')
const Event = require('../Tools/Event')
