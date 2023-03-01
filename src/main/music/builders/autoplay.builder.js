const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("autoplay")
      .setDescription("Autoplay music related to the current song")
      .addStringOption((option) =>
        option
          .setName("toggle")
          .setDescription("Toggle autoplay")
          .setRequired(true)
          .addChoices(
            { name: "On", value: "on" },
            { name: "Off", value: "off" }
          )
      );
    return builder;
  },
};
