const validateInput = (value, name = 'input') => {
  if (!value) { throw new Error(`The ${name} is required.`) }
  if (typeof value !== 'string') { throw new Error(`The ${name} have to be a string.`) }
}

module.exports = validateInput
