const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET'
}

exports.internalError = (body = 'Internal Server Error') => ({
  statusCode: 500,
  headers,
  body
})

exports.badRequest = (body = 'Not found') => ({
  statusCode: 404,
  headers,
  body
})

exports.notFound = (body = 'Not found') => ({
  statusCode: 404,
  headers,
  body
})

exports.json = (body) => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(body)
})
