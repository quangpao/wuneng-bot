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
    let eventFolders = readdirSync(`./src/main/${folder}/events`);
    if (!eventFolders) continue;

    eventFolders = eventFolders.filter((file) => file.endsWith(".js"));

    for (const file of eventFolders) {
      require(`../../../main/${folder}/events/${file}`)(client);
    }
  }
};
