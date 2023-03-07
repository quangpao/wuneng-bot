const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Emoji = require("../../../common/utils/Emoji");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Set the song volume.");
    return builder;
  },

  increaseVolumeBuilder: (number = undefined) => {
    const builder = new ButtonBuilder()
      .setEmoji(Emoji.volumeId)
      .setStyle(ButtonStyle.Success)
      .setDisabled(number >= 105);
    if (number === undefined) {
      builder.setCustomId("increasevolume");
    } else {
      builder.setCustomId(`increasevolume ${number > 100 ? 100 : number}`);
    }
    return builder;
  },

  decreaseVolumeBuilder: (number = undefined) => {
    const builder = new ButtonBuilder()
      .setEmoji(Emoji.lowVolumeId)
      .setStyle(ButtonStyle.Success)
      .setDisabled(number <= -5);
    if (number === undefined) {
      builder.setCustomId("decreasevolume");
    } else {
      builder.setCustomId(`decreasevolume ${number < 0 ? 0 : number}`);
    }
    return builder;
  },
};
