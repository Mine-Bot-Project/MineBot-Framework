// Get Number With Time Unit
module.exports = (number) => {
  if (number >= 86400000) return `${Math.trunc(number/86400000)} Day${(number/86400000 >= 2) ? 's' : ''}`
  else if (number >= 3600000) return `${Math.trunc(number/3600000)} Hour${(number/3600000 >= 2) ? 's' : ''}`
  else if (number >= 60000) return `${Math.trunc(number/60000)} Minute${(number/60000 >= 2) ? 's' : ''}`
  else if (number >= 1000) return `${Math.trunc(number/1000)} Second${(number/1000 >= 2) ? 's' : ''}`
  else return `${Math.trunc(number)} MS`
}
