const { StringSelectMenuInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { JumpedSong } = require("../../builders/embeds/jump.embed");
const { previousJumpMenuBuilder } = require("../../builders/jump.builder");

module.exports = {
  data: previousJumpMenuBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (channel === undefined || channel === null)
      return await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });

    const value = interaction.values[0];
    await distube
      .jump(interaction.guildId, parseInt(value))
      .then((song) => {
        interaction.reply({
          embeds: [JumpedSong(song)],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
