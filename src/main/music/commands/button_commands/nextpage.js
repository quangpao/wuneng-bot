const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const ActionRowBuilder = require("../../builders/action-row.builder");
const { Queue, QueueEmpty } = require("../../builders/embeds/queue.embed");
const { nextPageButtonBuilder } = require("../../builders/queue.builder");

module.exports = {
  data: nextPageButtonBuilder(),

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });

    const queueLength = queue.songs.length;

    let maxPage = Math.ceil((queueLength - 1) / 5);
    maxPage = maxPage > 0 ? maxPage : 1;

    if (interaction.extraData < maxPage) {
      interaction.extraData++;
    }

    ActionRowBuilder.queueRowBuilder(interaction.extraData, maxPage)
      .then(async (row) => {
        await interaction.update({
          embeds: [Queue(queue, interaction.extraData, maxPage)],
          components: [row],
        });
      })
      .catch((error) => console.log(error));
  },
};
