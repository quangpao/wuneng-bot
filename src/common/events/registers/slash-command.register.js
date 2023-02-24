// eslint-disable-next-line no-unused-vars
const WNClient = require("../../classes/WNClient");
const { readdirSync } = require("fs");

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  for (const folder of projectFolders) {
    const commandsFiles = readdirSync(
      `./src/main/${folder}/commands/slash_commands`
    ).filter((file) => file.endsWith(".js"));

    const { slashCommands, slashCommandArray } = client;
    for (const file of commandsFiles) {
      const command = require(`../../../main/${folder}/commands/slash_commands/${file}`);
      slashCommands.set(command.data.name, command);
      slashCommandArray.push(command.data.toJSON());
      console.log(`Slash command ${command.data.name} loaded!`);
    }
  }
};
