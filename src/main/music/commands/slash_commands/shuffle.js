const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { ShuffeItSelf } = require("../../builders/embeds/shuffle.embed");
const { slashBuilder } = require("../../builders/shuffle.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    let queue = distube.getQueue(interaction.guildId);

    if (!isQueueExist(interaction, queue)) return;
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [ShuffeItSelf()] });

    queue = await distube.shuffle(interaction.guildId);
    await interaction.reply("Queue shuffled");
  },
};
