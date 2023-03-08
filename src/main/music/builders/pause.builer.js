const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  PauseSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("pause")
      .setDescription("Pause the current song");
    return builder;
  },
};
