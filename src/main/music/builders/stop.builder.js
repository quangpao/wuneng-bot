const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  StopSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Stop playing songs and leave")
    return builder
  },
}