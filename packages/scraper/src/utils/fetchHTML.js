const fetch = require('node-fetch')

const fetchHTML = async (url) => {
  try {
    const res = await fetch(url)
    const body = await res.text()
    return body
  } catch (err) {
    throw new Error('There was a problem with the conection.')
  }
}

module.exports = fetchHTML
