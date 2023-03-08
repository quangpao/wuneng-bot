const { StopSlashBuilder } = require("../../builders/stop.builder");
const { ChatInputCommandInteraction } = require("discord.js");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { DisTube } = require("distube");
module.exports = {
  data: StopSlashBuilder(),
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
    console.log(interaction.guildId) // id discord server interaction
    await distube.stop(interaction.guildId);
    await interaction.reply(`Okay I'm stopping now!`)
  },
};
