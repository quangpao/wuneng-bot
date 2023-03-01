const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const ActionRowBuilder = require("../../builders/action-row.builder");
const {
  Queue,
  QueueEmpty,
  QueueAutoplay,
} = require("../../builders/embeds/queue.embed");
const queueBuilder = require("../../builders/queue.builder");

module.exports = {
  data: queueBuilder.slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    if (queue.autoplay)
      return await interaction.reply({ embeds: [QueueAutoplay(queue)] });
    const queueLength = queue.songs.length;
    const currentPage = 1;
    const maxPage = Math.ceil((queueLength - 1) / 5);

    ActionRowBuilder.queueRowBuilder(currentPage, maxPage)
      .then(async (row) => {
        await interaction.reply({
          embeds: [Queue(queue, currentPage, maxPage)],
          components: [row],
        });
      })
      .catch((error) => console.log(error));
  },
};
