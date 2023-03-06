const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { ShuffeItSelf } = require("../../builders/embeds/shuffle.embed");
const { slashBuilder } = require("../../builders/shuffle.builder");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [ShuffeItSelf()] });

    await distube.shuffle(interaction.guildId).then((queue) => {
      interaction.reply("Queue shuffled");
    });
  },
};
