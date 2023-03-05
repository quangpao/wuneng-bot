const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const {
  NoPrevious,
  PreviousSong,
} = require("../../builders/embeds/previous.embed");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { slashBuilder } = require("../../builders/previous.builder");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
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
