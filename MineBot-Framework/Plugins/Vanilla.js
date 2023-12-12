const { SlashCommandBuilder } = require('discord.js')

//Vanilla
module.exports = class {
  static get id () {return 'Vanilla'} 
  static get path () {return __filename}

  static init (core) {
    let command = new SlashCommandBuilder()
      .setName('play')
      .setNameLocalizations({
        'zh-TW': '遊玩',
        'en-US': 'play'
      })

    console.log(command)
  }

  static content (core) {

  } 
}
