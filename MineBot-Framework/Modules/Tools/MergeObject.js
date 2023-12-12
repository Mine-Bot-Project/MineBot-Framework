//Merge Object
module.exports = (target, object) => {
  Object.keys(object).forEach((item) => {
    if (typeof object[item] === 'object') {
      if (target[item] !== 'object') target[item] = {}

      module.exports(target[item], object[item])
    } else target[item] = object[item]
  })

  return object
}
