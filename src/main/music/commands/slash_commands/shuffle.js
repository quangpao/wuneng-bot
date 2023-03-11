const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { ShuffeItSelf } = require("../../builders/embeds/shuffle.embed");
const { slashBuilder } = require("../../builders/shuffle.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Shuffle queue list
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    let queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [ShuffeItSelf()] });

    try {
      queue = await queue.shuffle();
      await interaction.reply("Queue shuffled");
    } catch (error) {
      logger(error, interaction);
    }
  },
};
