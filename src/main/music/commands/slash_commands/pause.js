const { ChatInputCommandInteraction } = require("discord.js");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { DisTube, Song } = require("distube");
const { PauseSlashBuilder } = require("../../builders/pause.builer");
const { Pause, Resume } = require("../../builders/embeds/pauseResume.embed");
const queue = require("./queue");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");

module.exports = {
  data: PauseSlashBuilder(),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (channel === undefined || channel === null)
      return await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });
    const queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });
    console.log(interaction.guildId) // id discord server interaction
    distube.pause(interaction.guildId)
    await interaction.reply({embeds: [Pause(queue)]})
  },
};
