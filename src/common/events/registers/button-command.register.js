const WNClient = require("../../classes/WNClient");
const { readdirSync } = require("fs");

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of projectFolders) {
    const commandsFiles = readdirSync(
      `./src/main/${folder}/commands/button_commands`
    ).filter((file) => file.endsWith(".js"));

    const { buttonCommands } = client;
    for (const file of commandsFiles) {
      const command = require(`../../../main/${folder}/commands/button_commands/${file}`);
      buttonCommands.set(command.data.name, command);
      console.log(`Button command ${command.data.name} loaded!`);
    }
  }
};
