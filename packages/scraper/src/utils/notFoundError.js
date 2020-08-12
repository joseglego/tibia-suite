const notFoundError = (name = 'it') => {
  throw new Error(`Couldn't find ${name}. Maybe it's a typo. Please check and try again.`)
}

module.exports = notFoundError
