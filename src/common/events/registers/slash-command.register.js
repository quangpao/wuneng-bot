const WNClient = require("../../classes/WNClient");
const { readdirSync, existsSync } = require("fs");

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  const {
    slashCommands,
    slashCommandArray,
    slashCommandCategories,
    slashCommandInformation,
  } = client;
  for (const folder of projectFolders) {
    if (!existsSync(`./src/main/${folder}/commands/slash_commands`)) continue;

    const commandsFiles = readdirSync(
      `./src/main/${folder}/commands/slash_commands`
    ).filter((file) => file.endsWith(".js"));

    const category = {
      category: stringNormalize(folder),
      commands: [],
    };

    for (const file of commandsFiles) {
      const command = require(`../../../main/${folder}/commands/slash_commands/${file}`);
      slashCommands.set(command.data.name, command);
      slashCommandArray.push(command.data.toJSON());
      category.commands.push(command.data);
      slashCommandInformation.set(command.data.name, command.info);
      console.log(`Slash command ${command.data.name} loaded!`);
    }

    slashCommandCategories.push(category);
  }
};

/**
 * @param {string} string
 */
function stringNormalize(string) {
  string = string.replace("_", " ");
  return string.charAt(0).toUpperCase() + string.slice(1);
}
