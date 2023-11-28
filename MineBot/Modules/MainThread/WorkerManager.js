//Worker Manager
module.exports = class {
	constructor () {
    this.workers = {}
	}

	//Add Worker
	addWorker (Worker) {
		let id = generateID(5, Object.keys(this.workers))

	  this.workers[id] = Worker

		this.workers[id].on('message', this.#messageHandler)
	}

	//Message Handler
	#messageHandler (message) {

	}
}

const generateID = require('../Tools/GenerateID')
