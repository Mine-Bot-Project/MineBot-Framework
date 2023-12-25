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

    fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).forEach((language) => {
      if (path.parse(language).ext !== '.json') this.#Core.Log.add('warn', `<${language}> Translation File Must Be A JSON File`)
      else {
        try {
          let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../Data/Languages/${language}`), 'utf8'))

          if (typeof data !== 'object') this.#Core.Log.add('warn', `<${language}> Translation File Must Contain A <object>`)
          else if (typeof data.info !== 'object') this.#Core.Log.add('warn', `<${language}> Translation File Missing Contnent: ".info" <object>`)
          else if (typeof data.info.name !== 'string') this.#Core.Log.add('warn', `<${language}> Translation File Missing Contnent: ".info.name" <string>`)
          else if (typeof data.info.flag !== 'string') this.#Core.Log.add('warn', `<${language}> Translation File Missing Contnent: ".info.flag" <string>`)
          else if (typeof data.content !== 'object') this.#Core.Log.add('warn', `<${language}> Translation File Missing Contnent: ".content" <object>`)
          else this.languages.push(path.parse(language).name)
        } catch (error) {
          this.#Core.Log.add('warn', `<${language}> Failed To Parse JSON File`)
        }
      }
    })

    this.#Core.Log.finishState(state, 'green', `Successfully Loaded Translations (${parseInt((performance.now()-start)/60000).toFixed(1)}s)\n(Loaded): ${this.languages.length} (Skiped): ${fs.readdirSync(path.resolve(__dirname, '../../Data/Languages')).length-this.languages.length}`)

    if (this.languages.includes(this.#Core.info.defaultLanguage)) this.defaultLangauge = this.#Core.info.defaultLanguage
    else {
      this.#Core.Log.add('warn', `Default Language Not Found, Falling Back To "${this.languages[0]}"  ("${this.defaultLangauge}" -> "${this.languages[0]}")`)

      this.defaultLangauge = this.languages[0]
    }
  }
}
