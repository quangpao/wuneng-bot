const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { SkipSong, NoSkip } = require("../../builders/embeds/skip.embed");
const { slashBuilder } = require("../../builders/skip.builder");

module.exports = {
  data: slashBuilder(),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube : DisTube}}
   * @returns {Promise<void>}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    if (queue.songs.length === 0)
      return await interaction.reply({
        embeds: [NoSkip()],
      });

    await distube.skip(interaction.guildId).then((song) => {
      interaction.reply({
        embeds: [SkipSong(song)],
      });
    });
  },
};
