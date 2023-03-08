const { ButtonInteraction, PermissionFlagsBits } = require("discord.js");
const { DisTube } = require("distube");
const Permission = require("../../../../common/messages/permissions");
const {
  InsufficientPermissionEmbedBuilder,
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { joinSpeakerCheck } = require("../../utils/permission.check");
const {
  SelectSearchPlayButtonBuilder,
} = require("../../builders/search.builder");

module.exports = {
  data: SelectSearchPlayButtonBuilder(),

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (channel === undefined || channel === null)
      return await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });
    if (!joinSpeakerCheck(interaction, channel)) return;
    if (
      !interaction.channel
        .permissionsFor(interaction.guild.members.me)
        .has(PermissionFlagsBits.SendMessages)
    )
      return await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SEND_MESSAGES)],
      });
    await distube.play(channel, interaction.extraData, {
      textChannel: interaction.channel,
      member: interaction.member,
    });
  },
};
