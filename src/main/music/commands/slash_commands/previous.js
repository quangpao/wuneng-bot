const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NoPrevious,
  PreviousSong,
} = require("../../builders/embeds/previous.embed");
const { slashBuilder } = require("../../builders/previous.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (!isQueueExist(interaction, queue)) return;
    if (queue.previousSongs.length === 0)
      return await interaction.reply({
        embeds: [NoPrevious()],
      });

    await distube.previous(interaction.guildId).then((song) => {
      interaction.reply({
        embeds: [PreviousSong(song)],
      });
    });
  },
};
