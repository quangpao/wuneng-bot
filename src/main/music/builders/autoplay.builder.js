const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  AutoplaySlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("autoplay")
      .setDescription("Autoplay music related to the current song");
    return builder;
  },
};
