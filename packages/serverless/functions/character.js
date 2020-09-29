const scraper = require('@tibia-suite/scraper');

exports.handler = async ({ queryStringParameters }) => {
  const NOT_FOUND = { statusCode: 404, body: 'Not found' };
  const {name} = queryStringParameters;

  if (!name) { return NOT_FOUND; }

  const character = await scraper.getCharacter(name);

  if (!character) { return NOT_FOUND; }

  return {
    statusCode: 200,
    body: JSON.stringify(character)
  };
};
