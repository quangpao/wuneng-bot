const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("shuffle")
      .setDescription("Shuffles the queue");
    return builder;
  },
};
