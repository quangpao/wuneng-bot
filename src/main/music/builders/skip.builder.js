const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("skip")
      .setDescription("Skip the current song");
    return builder;
  },
};
