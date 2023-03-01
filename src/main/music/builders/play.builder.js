const { SlashCommandBuilder, ButtonBuilder } = require("discord.js");
const Emoji = require("../../../common/utils/Emoji");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("play")
      .setDescription("Play a song in a voice channel")
      .addStringOption((option) =>
        option
          .setName("song")
          .setDescription("Input the song name")
          .setRequired(true)
      );
    return builder;
  },

  buttonBuilder: () => {
    const builder = new ButtonBuilder()
      .setCustomId("playbtn")
      .setStyle("PRIMARY")
      .setEmoji(Emoji.playId)
      .setDisabled(true);
    return builder;
  },
};
