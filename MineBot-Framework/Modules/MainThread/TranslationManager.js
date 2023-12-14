const path = require('path')
const fs = require('fs')

//Translation Manger
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core
  }

  //Check Translations
  check () {
    let state = this.#Core.Log.addState('white', `Translation Manager`, `Checking Translations (${fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).length})`)

    let start = performance.now()

    fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).forEach((item) => {
      if (path.parse(item).ext !== '.json') throw new Error(`Translation File Must Be A ".json" File (${path.parse(item).name})`) 

      this.#Core.Log.add('info', item)
    })

    this.#Core.Log.finishState(state, 'green', `Translations Check Complete (${parseInt((performance.now()-start)/60000).toFixed(1)}s)`)
  }
}
