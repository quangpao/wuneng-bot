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
  client.on("ready", async (client) => {
    const guildIds = client.guilds.cache.map((guild) => guild.id);
    const rest = new REST({ version: "10" }).setToken(TOKENID);

    for (const guildId of guildIds) {
      await rest
        .put(Routes.applicationCommands(CLIENTID, guildId), {
          body: client.slashCommandArray,
        })
        .then(() => console.log(`Deployed slash commands to ${guildId}`))
        .catch(console.error);
    }

    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("guildCreate", async (guild) => {
    console.log(
      `Joined a new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
    const rest = new REST({ version: "10" }).setToken(TOKENID);

    await rest
      .put(Routes.applicationCommands(CLIENTID, guild.id), {
        body: client.slashCommandArray,
      })
      .then(() => console.log(`Deployed slash commands to ${guild.id}`))
      .catch(console.error);
  });
};
