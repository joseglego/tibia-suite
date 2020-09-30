const scraper = require('@tibia-suite/scraper');
const response = require('./utils/response');

exports.handler = async ({ path }) => {
  const name = path.split('/')[4];

  if (name) {
    let world;
    try {
      world = await scraper.getWorld(name);
    } catch(err) {
      return response.notFound();
    }

    return response.json(world);
  } else {
    const worlds = await scraper.getWorlds();

    return response.json(worlds);
  }
};
