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

    languages.forEach((item) => {
      this.#data[item] = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../Data/Languages/${item}.json`)))
    })
  }

  // Get Translation
  get (path, language) {
    let target = this.#data[language].content

    path.split('>>').forEach((item) => {
      if (typeof target !== 'object') throw new Error(`Translation Not Found: ${path} (${language})`)

      target = target[item]
    })

    if (typeof target !== 'string') throw new Error(`Translation Not Found: ${path} (${language})`)

    return target
  }

  // Get Language Info
  getLanguageInfo (language) {
    return (this.#data[language] === undefined) ? undefined : this.#data[language].info
  }
}
