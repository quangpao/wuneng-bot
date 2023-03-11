const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { SkipSong, NoSkip } = require("../../builders/embeds/skip.embed");
const { slashBuilder } = require("../../builders/skip.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Skip current song and play next song
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   * @returns {Promise<void>}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;
    if (queue.songs.length === 1 && !queue.autoplay)
      return await interaction.reply({ embeds: [NoSkip()] });

    try {
      const song = await queue.skip();
      await interaction.reply({ embeds: [SkipSong(song)] });
    } catch (error) {
      logger(error, interaction);
    }
  },
};
