const scraper = require('@tibia-suite/scraper');
const response = require('./utils/response');

exports.handler = async ({ path, queryStringParameters }) => {
  const name = path.split('/')[4] || queryStringParameters.name;

  if (!name) { return response.notFound(); }

  const character = await scraper.getCharacter(name);

  if (!character) { return response.notFound(); }

  return response.json(character);
};
