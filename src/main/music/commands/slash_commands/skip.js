const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { SkipSong, NoSkip } = require("../../builders/embeds/skip.embed");
const { slashBuilder } = require("../../builders/skip.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   * @returns {Promise<void>}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!isQueueExist(interaction, queue)) return;
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [NoSkip()] });

    const song = await distube.skip(interaction.guildId);
    await interaction.reply({ embeds: [SkipSong(song)] });
  },
};
