const scraper = require('@tibia-suite/scraper');
const response = require('./utils/response');

exports.handler = async () => {
  const worlds = await scraper.getWorlds();

  return response.json(worlds);
};
