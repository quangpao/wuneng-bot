const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { queueRowBuilder } = require("../../builders/action-row.builder");
const { Queue, QueueAutoplay } = require("../../builders/embeds/queue.embed");
const queueBuilder = require("../../builders/queue.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: queueBuilder.slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (!isQueueExist(interaction, queue)) return;
    if (queue.autoplay)
      return await interaction.reply({ embeds: [QueueAutoplay(queue)] });

    const queueLength = queue.songs.length;
    const currentPage = 1;
    const maxPage = Math.ceil((queueLength - 1) / 5);

    const row = await queueRowBuilder(currentPage, maxPage);
    await interaction.reply({
      embeds: [Queue(queue, currentPage, maxPage)],
      components: [row],
    });
  },
};
