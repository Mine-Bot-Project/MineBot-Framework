// Merge Object
module.exports = (target, object) => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object') {
      if (target[key] !== 'object') target[key] = {}

      module.exports(target[key], object[key])
    } else target[key] = object[key]
  })

  return object
}
