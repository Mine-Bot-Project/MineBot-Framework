// Timer
module.exports = class {
  #interval

  #timers = {}

  constructor () {
    this.#interval = setInterval(() => {
      let time = performance.now()

      Object.keys(this.#timers).forEach((id) => {
        if (time-this.#timers[id].lastUpdateTime >= this.#timers[id].interval) {
          this.#timers[id].callback(this.#timers[id].count)

          this.#timers[id].lastUpdateTime = time

          if (this.#timers[id].times !== Infinity) {
            this.#timers[id].count++

            if (this.#timers[id].count >= this.#timers[id].times) {
              if (this.#timers[id].callback2 !== undefined) this.#timers[id].callback2()

              delete this.#timers[id]
            }
          }
        }
      })
    }, 1)
  }

  // Create Interval
  createInterval (interval, callback) {
    let id = generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times: Infinity,

      callback,

      count: 0,
      lastUpdateTime: performance.now()-interval
    }

    return id
  }

  // Create Loop
  createLoop (interval, times, callback, callback2) {
    let id = generateID(5, Object.keys(this.#timers))

    this.#timers[id] = {
      interval,
      times,

      callback,
      callback2,

      count: 0,
      lastUpdateTime: performance.now()-interval
    }

    return id
  }

  // Delete Timer
  deleteTimer (id) {
    if (this.#timers[id] === undefined) throw new Error(`Timer Not Found: ${id}`)

    delete this.#timers[id]
  }

  // Delete All Timers
  stopTimers () {
    clearInterval(this.#interval)

    this.#timers = {}
  }
}

const generateID = require('../Tools/GenerateID')
