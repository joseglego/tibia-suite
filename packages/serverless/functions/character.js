const scraper = require('@tibia-suite/scraper');
const response = require('./utils/response');

exports.handler = async ({ queryStringParameters }) => {
  const {name} = queryStringParameters;

  if (!name) { return response.notFound(); }

  const character = await scraper.getCharacter(name);

  if (!character) { return response.notFound(); }

  return response.json(character);
};
