const WNClient = require("../../classes/WNClient");
const { readdirSync, existsSync } = require("fs");

/**
 * @param {WNClient} client
 */
module.exports = (client) => {
  const projectFolders = readdirSync("./src/main", { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  for (const folder of projectFolders) {
    if (!existsSync(`./src/main/${folder}/events`)) continue;

    const eventFolders = readdirSync(`./src/main/${folder}/events`).filter(
      (file) => file.endsWith(".js")
    );

    for (const file of eventFolders) {
      require(`../../../main/${folder}/events/${file}`)(client);
    }
  }
};
