const Table = require('cli-table')

const drawTable = (title, ...info) => {
  const headerLine = [title]

  if (info && info[0]) {
    info[0].forEach((_, i) => { headerLine[i] = headerLine[i] || '' })
  }

  const table = new Table({
    head: headerLine,
    chars: { middle: ' ', 'top-mid': '─', 'bottom-mid': '─', 'mid-mid': '─' }
  })

  table.push(
    ...info
  )

  console.log(table.toString())
}

module.exports = drawTable
