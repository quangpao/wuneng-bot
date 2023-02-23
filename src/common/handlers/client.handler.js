// eslint-disable-next-line no-unused-vars
const WNClient = require("../classes/WNClient");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

require("dotenv").config();
const { TOKENID, CLIENTID } = process.env;

/**
 *
 * @param {WNClient} client
 */
module.exports = (client) => {
  client.on("ready", (client) => {
    const guildIds = client.guilds.cache.map((guild) => guild.id);
    const rest = new REST({ version: "10" }).setToken(TOKENID);

    for (const guildId of guildIds) {
      rest
        .put(Routes.applicationCommands(CLIENTID, guildId), {
          body: client.slashCommandArray,
        })
        .then(() => console.log(`Deployed slash commands to ${guildId}`))
        .catch(console.error);
    }

    console.log(`Logged in as ${client.user.tag}!`);
  });
};
