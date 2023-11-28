const wcwidth = require('wcwidth')

//Command Line Interface
module.exports = class {
  constructor () {
  	this.cli = new CLI()
		this.log = new Log()

		this.cli.addPage('Logs', () => this.log.getLogs())
	}
}

//Log
class Log {	
	constructor () {
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
			}
		}
	}

	//Add Log
	add (type, content) {
    if (this.logTypes[type] === undefined) throw new Error(`Unknown Log Type: ${type}`)

		let lines = content.split('\n')
    
		if (lines.length > 0) {
      let string = `[${this.logTypes[type].title}]: `
			
			for (let i = lines.length-1; i >= 0; i--) {
				if (i === 0) {
          this.lines.splice(0, 0, ' ', '')
				} else this.lines.splice(0, 0, ' '.repeat(wcwidth(string))+`${FontColor[this.logTypes[type].color]}${this.lines[i]}`)
			}

		} else this.lines.splice(0, 0, `${FontColor[this.logTypes[type].color]}:[${this.logTypes[type].title}]: ${content}`)
	}

	//Add State
	addState (color, title, content, parentID) {
		if (parentID === undefined) {
    	let id = generateID(5, Object.keys(this.states))

			this.lines.slice(0, 1, `<State>${id}`)
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
	changeState (id, color, title, content) {
		if (id.includes('.')) {
			id = id.split('.')

			if (this.states[id[0]] === undefined) throw new Error(`Parent Not Found: ${id}`)
			if (this.states[id[0]].children[id[1]] === undefined) throw new Error(`Child Not Found: ${id[0]}.${id[1]}`)

			if (color !== undefined) this.states[id[0]].children[id[1]].color = color
      if (title !== undefined) this.states[id[0]].children[id[1]].title = title
      if (content !== undefined) this.states[id[0]].children[id[1]].content = content
		} else {
			if (this.states[id] === undefined) throw new Error(`State Not Found: ${id}`)

			if (color !== undefined) this.states[id].color = color
			if (title !== undefined) this.states[id].title = title
			if (content !== undefined) this.states[id].content = content
		}
	}

	//Remove State
	removeState (id) {
		if (id.includes('.')) {
      id = id.split('.')

      if (this.states[id[0]] === undefined) throw new Error(`Parent Not Found: ${id}`)
			if (this.states[id[0]].children[id[1]] === undefined) throw new Error(`Child Not Found: ${id[0]}.${id[1]}`)
				
			delete this.states[id[0]].children[id[1]]
		} else {
			if (this.states[id] === undefined) throw new Error(`State Not Found: ${id}`)
      
			delete this.states[id]
		}
	}

	//Get Logs
	getLogs () {
		if (this.lines.length > 100) this.data.splice(100, this.lines.length-100)

		return this.lines.map((item) => {
			if (item.substring(0, 7) === '<State>') {
        let id = item.replace('<State>', '')

				return `${FontColor[this.states[id].color]}[${this.states[id].title}]: ${this.states[id].title}`
			} else return item
		})
	}
}

const { CLI, FontColor } = require('../Tools/DynamicCLI')
const generateID = require('../Tools/GenerateID')
