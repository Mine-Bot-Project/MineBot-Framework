const path = require('path')
const fs = require('fs')

// Translation Manger
module.exports = class {
  #Core

  constructor (Core) {
    this.#Core = Core

    this.defaultLangauge = undefined
    this.languages = []
  }

  // Load Translations
  load () {
    let state = this.#Core.Log.addState('white', `Translation Manager`, `Loading Translations (${fs.readdirSync(path.resolve(__dirname, '../../data/languages')).length})`)

    let start = performance.now()

    this.languages = []

    fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).forEach((item) => {
      if (path.parse(item).ext !== '.json') this.#Core.Log.add('warn', `<${item}> Translation File Must Be A JSON File`)
      else {
        try {
          JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../Data/Languages/${item}`), 'utf8'))

          this.languages.push(path.parse(item).name)
        } catch (error) {
          this.#Core.Log.add('warn', `<${item}> Failed To Parse JSON File`)
        }
      }
    })

    this.#Core.Log.finishState(state, 'green', `Successfully Loaded Translations (${parseInt((performance.now()-start)/60000).toFixed(1)}s)\n(Loaded): ${this.langauges.length} (Skiped): ${fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).length-this.langauges.length}`)

    if (this.languages.includes(this.#Core.info.defaultLangauge)) this.defaultLangauge = this.#Core.info.defaultLanguage
    else {
      this.#Core.Log.log('warn', `Default Language Not Found, Falling Back To ${this.languages[0]}  (${this.defaultLangauge} -> ${this.languages[0]})`)

      this.defaultLangauge = this.languages[0]
    }
  }
}
