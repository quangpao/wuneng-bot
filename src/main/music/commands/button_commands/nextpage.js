const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { queueRowBuilder } = require("../../builders/action-row.builder");
const { Queue } = require("../../builders/embeds/queue.embed");
const { nextPageButtonBuilder } = require("../../builders/queue.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: nextPageButtonBuilder(),

  /**
   * Next page of queue
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;

    // Queue variable declaration
    let maxPage = Math.ceil((queue.songs.length - 1) / 5);
    maxPage = maxPage > 0 ? maxPage : 1;
    if (interaction.extraData < maxPage) {
      interaction.extraData++;
    }

    try {
      const row = await queueRowBuilder(interaction.extraData, maxPage);
      await interaction.update({
        embeds: [Queue(queue, interaction.extraData, maxPage)],
        components: [row],
      });
    } catch (error) {
      logger(error, interaction.user);
    }
  },
};
