const path = require('path')

const MineBot = require('../../MineBot-Framework/API')

require('dotenv').config()

let bot = new MineBot(path.resolve(__dirname, 'Data'), {
  token: process.env.TOKEN,
  clientID: '1174924220657049630',
  
  clusters: 1
})

bot.start()
