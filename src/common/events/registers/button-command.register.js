// eslint-disable-next-line no-unused-vars
const { Client, Collection } = require('discord.js')
const { readdirSync } = require('fs')

/**
 * @param {Client} client
 */
module.exports = (client) => {

  client.buttonCommands = new Collection();

  client.buttonCommandsRegister = async() => {
    const projectFolders = readdirSync("./src/main", { withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const folder of projectFolders) {
      const commandsFiles = readdirSync(`./src/main/${folder}/commands/button_commands`)
        .filter(file => file.endsWith('.js'));

      const { buttonCommands } = client;
      for (const file of commandsFiles) {
        const command = require(`../../../main/${folder}/commands/button_commands/${file}`);
        buttonCommands.set(command.data.name, command);
        console.log(`Button command ${command.data.name} loaded!`);
      }
    }
  }
}