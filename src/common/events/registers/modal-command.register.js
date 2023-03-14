const WNClient = require("../../classes/WNClient");
const { readdirSync, existsSync } = require("fs");

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of projectFolders) {
    if (!existsSync(`./src/main/${folder}/commands/modal_commands`))
      continue;

    const commandsFiles = readdirSync(
      `./src/main/${folder}/commands/modal_commands`
    ).filter((file) => file.endsWith(".js"));

    const { modalCommands } = client;
    for (const file of commandsFiles) {
      const command = require(`../../../main/${folder}/commands/modal_commands/${file}`);
      modalCommands.set(command.data.data.custom_id, command);
      console.log(`Selectmenu command ${command.data.data.custom_id} loaded!`);
    }
  }
};
