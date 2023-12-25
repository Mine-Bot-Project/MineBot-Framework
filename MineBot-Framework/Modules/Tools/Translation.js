const path = require('path')
const fs = require('fs')

// Translation
module.exports = class {
  #data = {}

  constructor () {

  }

  // Load translations
  load (languages) {
    this.#data = {}

    languages.forEach((language) => {
      this.#data[language] = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../Data/Languages/${language}.json`)))
    })
  }

  // Get Translation
  get (path, language) {
    let target = this.#data[language].content

    path.split('>>').forEach((key) => {
      if (typeof target !== 'object') throw new Error(`Translation Not Found: ${path} (${language})`)

      target = target[key]
    })

    if (typeof target !== 'string') throw new Error(`Translation Not Found: ${path} (${language})`)

    return target
  }

  // Get Language Info
  getLanguageInfo (language) {
    return (this.#data[language] === undefined) ? undefined : this.#data[language].info
  }
}
