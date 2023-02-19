const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

require("../src/common/events/registers/slash-command.register")(client);
require("../src/common/events/registers/button-command.register")(client);
require("../src/common/events/registers/distube.register")(client);
require("./deploy")(client);
