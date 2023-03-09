const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("seek")
      .setDescription("Seek playing time to another position")
      .addNumberOption((option) =>
        option
          .setMinValue(0)
          .setName("duration")
          .setDescription("Choose the time(in second) to seek")
          .setRequired(true)
      );
    return builder;
  },
};
