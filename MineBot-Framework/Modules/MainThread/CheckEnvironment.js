const os = require('os')

//Check Environment
module.exports = () => {
  if (!['linux', 'darwin', 'win32'].includes(os.platform())) throw new Error(`Unsupported Platform: ${core}`)

  const packages = ['wcwidth', 'discord.js', 'discord-hybrid-sharding'] 

  let missingPackages = []
  
  packages.forEach((item) => {
    try {
      require(item)
    } catch (error) {
      missingPackages.push(item)
    }
   })

  if (missingPackages > 0) throw new Error(`Missing Pacakge(s): ${missingPackages.join(', ')}`)
}
