//System Core (Child Thread)
module.exports = class {
  //Call Function (Call function in Main Thread)
  static async callFunction (name, data) {
    let response = await client.cluster.request({ type: 'callFunction', name, data })

    if (response.error) {
      if (response.content === 'Function Not Found') throw new Error(`Function Not Found: ${name}`)
      
      throw response.content
    } else return response.data    
  }
}

const client = require('./Main')
