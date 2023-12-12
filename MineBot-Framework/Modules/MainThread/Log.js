const wcwidth = require('wcwidth')

//Log
module.exports = class {
  constructor (core) {
    core.WorkerManager.registerFunction('Log.add', (type, content) => this.add(type, content))
    core.WorkerManager.registerFunction('Log.addSpace', () => this.addSpace())
    core.WorkerManager.registerFunction('Log.addState', (color, title, content, parentID) => this.addState(color, title, content, parentID))
    core.WorkerManager.registerFunction('Log.changeState', (id, color, content) => this.changeState(id, color, content))
    core.WorkerManager.registerFunction('Log.finishState', (id, color, content) => this.finishState(id, color, content))

    this.lines = []
    this.states = {}

    this.logTypes = {
      running: {
        color: 'white',
        title: 'Running'
      },
      complete: {
        color: 'green',
        title: 'Complete'
      },
      warn: {
        color: 'yellow',
        title: 'Warning'
      },
      error: {
        color: 'red',
        title: 'Error'
      },
      info: {
        color: 'purple',
        title: 'Info'
      }
    }
  }

  //Add Log
  add (type, content) {
    if (this.logTypes[type] === undefined) throw new Error(`Unknown Log Type: ${type}`)

    if (typeof content !== 'string') content = JSON.stringify(content, null, 2)

    let lines = content.split('\n')
    
    if (lines.length > 1) {
      let string = `[${this.logTypes[type].title}]: `
      
      for (let i = lines.length-1; i >= 0; i--) {
        if (i === 0) this.lines.splice(0, 0, `${string}${lines[0]}`)
        else this.lines.splice(0, 0, ' '.repeat(wcwidth(string))+`${FontColor[this.logTypes[type].color]}${lines[i]}`)
      }
    } else this.lines.splice(0, 0, `${FontColor[this.logTypes[type].color]}[${this.logTypes[type].title}]: ${content}`)
  }

  //Add Space (Empty line)
  addSpace () {
    this.lines.splice(0, 0, '')
  }

  //Add State
  addState (color, title, content, parentID) {
    if (parentID === undefined) {
      let id = generateID(5, Object.keys(this.states))

      this.lines.splice(0, 0, `<State>${id}`)
      this.states[id] = { color, title, content, children: {} }

      return id
    } else {
      if (this.states[parentID] === undefined) throw new Error(`State Not Found: ${id}`)

      let id = generateID(5, Object.keys(this.states[parentID].children))

      this.states[parentID].children[id] = { color, title, content }

      return `${parentID}.${id}`
    }
  }

  //Change State
  changeState (id, color, content) {
    if (id.includes('.')) {
      id = id.split('.')

      if (this.states[id[0]] === undefined) throw new Error(`Parent Not Found: ${id}`)
      if (this.states[id[0]].children[id[1]] === undefined) throw new Error(`Child Not Found: ${id[0]}.${id[1]}`)

      if (color !== undefined) this.states[id[0]].children[id[1]].color = color
      if (content !== undefined) this.states[id[0]].children[id[1]].content = content
    } else {
      if (this.states[id] === undefined) throw new Error(`State Not Found: ${id}`)

      if (color !== undefined) this.states[id].color = color
      if (content !== undefined) this.states[id].content = content
    }
  }

  //Finish State
  finishState (id, color, content) {
    if (id.includes('.')) {
      id = id.split('.')

      if (this.states[id[0]] === undefined) throw new Error(`Parent Not Found: ${id}`)
      if (this.states[id[0]].children[id[1]] === undefined) throw new Error(`Child Not Found: ${id[0]}.${id[1]}`)
        
      delete this.states[id[0]].children[id[1]]
    } else {
      if (this.states[id] === undefined) throw new Error(`State Not Found: ${id}`)

      let lines = content.split('\n')

      if (lines.length > 1) {
        let string = `[${this.states[id].title}]: `

        for (let i = lines.length-1; i >= 0; i--) {
          if (i === 0) this.lines[this.lines.indexOf(`<State>${id}`)] = `${FontColor[color]}[${this.states[id].title}]: ${lines[0]}`  
          else this.lines.splice(this.lines.indexOf(`<State>${id}`)+1, 0, ' '.repeat(wcwidth(string))+`${FontColor[color]}${lines[i]}`)
        }        
      } else this.lines[this.lines.indexOf(`<State>${id}`)] = `${FontColor[color]}[${this.states[id].title}]: ${content}`

      delete this.states[id]
    }
  }

  //Get Logs
  getLogs () {
    if (this.lines.length > 100) this.data.splice(100, this.lines.length-100)

    let lines = []

    this.lines.forEach((item) => {
      if (item.substring(0, 7) === '<State>') {
        let id = item.replace('<State>', '')

        lines.push(`${FontColor[this.states[id].color]}[${this.states[id].title}]: ${this.states[id].content}`)

        Object.keys(this.states[id].children).forEach((item) => {
          lines.push(`${FontColor.white}｜${FontColor[this.states[id].children[item].color]}[${this.states[id].children[item].title}]: ${this.states[id].children[item].content}`)
        })
      } else lines.push(item)
    })

    return lines
  }
}

const { FontColor } = require('../Tools/DynamicCLI')
const generateID = require('../Tools/GenerateID')
