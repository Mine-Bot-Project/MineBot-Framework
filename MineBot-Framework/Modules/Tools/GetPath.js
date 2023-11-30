const os = require('os')

//取得卻對路徑
module.exports = (basePath, move) => {
  let path = basePath.split(pathSymbol)

	move.forEach((item) => {
    if (item === '<') path.splice(path.length-1, 1)
		else path.push(item)
	})

	return path.join(pathSymbol) 
}

let pathSymbol
if (os.platform() === 'linux' || os.platform() === 'darwin') pathSymbol = '/'
else if (os.platform() === 'win32') pathSymbol = '\\'
