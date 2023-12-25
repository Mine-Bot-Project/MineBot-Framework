// Worker Manager
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.Event = new Event()

    this.workers = {}
    this.functions = {}

    Core.Timer.createInterval(1000, () => {
      Object.keys(this.workers).forEach((id) => {
        console.log(this.workers[id].worker.send({ type: 'getDelay', id, startTime: performance.now() }))
      })
    })
  }

  // Add Worker
  addWorker (Worker) {
    let id = generateID(5, Object.keys(this.workers))

    this.workers[id] = { info: { delay: 0, lastMessage: 'None' }, worker: Worker }

    this.Event.listen(this.workers[id].worker, 'message', (msg) => this.#messageHandler(msg, id))
  }

  // Register Function (Functions that can be called from other worker thread)
  registerFunction (name, callback) {
    if (this.functions[name] !== undefined) throw new Error(`Function Name Is Already Used: ${callback}`)
  
    this.functions[name] = callback
  }

  // Message Handler
  async #messageHandler (msg, id) {
    this.workers[id].info.lastMessage = msg.type

    if (msg.type === 'setDelay') this.workers[id].info.delay = Math.trunc(performance.now()-msg.startTime)
    else if (msg.type === 'callFunction') {
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
