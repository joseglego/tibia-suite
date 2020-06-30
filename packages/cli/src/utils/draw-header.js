const colors = require('colors')

const drawHeader = (header) => header.map(title => colors.red(title))

module.exports = drawHeader
