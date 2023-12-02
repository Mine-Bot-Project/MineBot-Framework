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
  async #messageHandler (msg) {
    if (msg.type === 'callFunction') {
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
