const jsonToTable = (json) => {
  const keys = Object.keys(json)
  const values = Object.values(json)

  return keys.reduce((acc, tmpKey, i) => {
    acc.push([
      tmpKey[0].toUpperCase() + tmpKey.substr(1),
      values[i]
    ])

    return acc
  }, [])
}

module.exports = jsonToTable
