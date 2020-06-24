const camelize = require('./camelize')

const translateJson = (acc, json) => {
  const keyName = camelize(json[0].substring(0, json[0].length - 1))
  const value = json[1]
  acc[`${keyName}`] = value

  return acc
}

module.exports = translateJson
