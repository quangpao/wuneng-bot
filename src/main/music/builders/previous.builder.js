const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("previous")
      .setDescription("Play the previous song");
    return builder;
  },
};
