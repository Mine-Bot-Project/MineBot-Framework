//Event
module.exports = class {
  #events = []

  constructor () {
    
  }

  // Listen To Event
  listen (target, name, callback) {
    target.on(name, callback)

    this.#events.push({ target, name, callback })
  }

  // Clear
  clear (target, name) {
    for (let i = this.#events.length-1; i >= 0; i--) {
      if (target === this.#events[i].target || (name === undefined || name === this.#events[i].name)) {
        target.off(this.#events[i].name, this.#events[i].callback)

        this.#events.splice(i, 1)
      }
    }
  }
}
