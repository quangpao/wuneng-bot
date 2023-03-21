const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  PreviousSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("previous")
      .setDescription("Play the previous song");
    return builder;
  },
};
