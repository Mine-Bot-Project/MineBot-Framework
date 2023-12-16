const path = require('path')
const fs = require('fs')

//Translation Manger
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.langauges = []
  }

  //Load Translations
  load () {
    let state = this.#Core.Log.addState('white', `Translation Manager`, `Loading Translations (${fs.readdirSync(path.resolve(__dirname, '../../data/languages')).length})`)

    let start = performance.now()

    this.langauges = []

    fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).forEach((item) => {
      if (path.parse(item).ext !== '.json') this.#Core.Log.add('warn', `<${item}> Translation File Must Be A JSON File`)
      else {
        try {
          JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../Data/Languages/${item}`), 'utf8'))

          this.langauges.push(path.parse(item).name)
        } catch (error) {
          this.#Core.Log.add('warn', `<${item}> Failed To Parse JSON File`)
        }
      }
    })

    this.#Core.Log.finishState(state, 'green', `Successfully Loaded Translations (${parseInt((performance.now()-start)/60000).toFixed(1)}s)\n(Loaded): ${this.langauges.length} (Skiped): ${fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).length-this.langauges.length}`)
  }
}
