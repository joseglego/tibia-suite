const fetch = require('node-fetch')

const fetchHTML = async (url) => {
  const res = await fetch(url)
  const body = await res.text()
  return body
}

module.exports = fetchHTML
