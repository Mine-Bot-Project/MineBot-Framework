const path = require('path')

const MineBot = require('../../MineBot-Framework/API')

let bot = new MineBot(path.resolve(__dirname, 'Data'), {
  token: 'MTE3NDkyNDIyMDY1NzA0OTYzMA.GqRegt.zLFkXYzGLWUxyQWUmXX1h3_djCI8YIYUzYAceI',
  clientID: '1174924220657049630',
  
  clusters: 2
})

bot.start()
