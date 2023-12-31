const os = require('os')

// Check Environment
module.exports = () => {
  if (!['linux', 'darwin', 'win32'].includes(os.platform())) throw new Error(`Unsupported Platform: ${core}`)

  const packages = ['wcwidth', 'discord.js', 'discord-hybrid-sharding'] 

  let missingPackages = []
  
  packages.forEach((package) => {
    try {
      require(package)
    } catch (error) {
      missingPackages.push(package)
    }
  })

  if (missingPackages.length > 1) throw new Error(`Missing Packages: ${missingPackages.join(', ')}`)
  else if (missingPackages.length > 0) throw new Error(`Missing Package: ${missingPackages[0]}`)

}
