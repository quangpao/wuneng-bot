const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("repeat")
      .setDescription(
        "The song or playlist will replay continuously base on the mode"
      )
      .addStringOption((option) =>
        option
          .setName("toggle")
          .setDescription("Input the mode to repeat")
          .setRequired(true)
          .addChoices(
            { name: "Song", value: "1" },
            { name: "Queue", value: "2" },
            { name: "Disable", value: "0" }
          )
      );
    return builder;
  },
};
