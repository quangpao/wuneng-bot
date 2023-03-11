const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const {
  NoPrevious,
  PreviousSong,
} = require("../../builders/embeds/previous.embed");
const { slashBuilder } = require("../../builders/previous.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Play previous song
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;
    if (queue.previousSongs.length === 0)
      return await interaction.reply({
        embeds: [NoPrevious()],
      });

    try {
      const song = await queue.previous();
      await interaction.reply({ embeds: [PreviousSong(song)] });
    } catch (error) {
      logger(error, interaction);
    }
  },
};
