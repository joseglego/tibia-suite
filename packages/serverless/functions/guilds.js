const scraper = require('@tibia-suite/scraper');
const response = require('./utils/response');

exports.handler = async ({ path, queryStringParameters }) => {
  const guildName = path.split('/')[3];

  if (guildName) {
    let guild;

    try {
      guild = await scraper.getGuild(guildName);
    } catch(err) {
      return response.notFound();
    }

    return response.json(guild);
  } else {
    const { world: worldName } = queryStringParameters;

    if (!worldName) return response.badRequest('The world of the world is required');
    let guilds;

    try {
      guilds = await scraper.getGuilds(worldName);
    } catch(err) {
      return response.internalError();
    }

    return response.json(guilds);
  }
};
