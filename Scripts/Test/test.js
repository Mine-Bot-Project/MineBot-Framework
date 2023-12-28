const path = require('path')

const { Bot } = require('../../Minebot-Framework/API')

require('dotenv').config()

let bot = new Bot(path.resolve(__dirname, 'Data'), {
  token: process.env.TOKEN,
  clientID: '1174924220657049630',
  
  clusters: 2
})

bot.start()
