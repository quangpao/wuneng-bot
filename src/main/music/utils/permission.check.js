const {
  VoiceChannel,
  ButtonInteraction,
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
} = require("discord.js");
const {
  InsufficientPermissionEmbedBuilder,
  NotInVoiceChannelEmbedBuilder,
} = require("../../../common/builders/General");
const Permission = require("../../../common/messages/permissions");

module.exports = {
  /**
   *
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @returns
   */
  inVoiceChannel: (interaction) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;

    if (channel === undefined || channel === null) {
      interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });
      return false;
    }
    return true;
  },

  /**
   *
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @returns
   */
  joinSpeakerCheck: (interaction) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;

    if (!channel.joinable) {
      interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.CONNECT)],
      });
      return false;
    }
    if (!channel.speakable) {
      interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SPEAK)],
      });
      return false;
    }
    return true;
  },

  /**
   *
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {bigint} permission
   */
  hasPermission: (interaction, permission) => {
    if (
      !interaction.channel
        .permissionsFor(interaction.guild.members.me)
        .has(permission)
    ) {
      interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SEND_MESSAGES)],
      });
      return false;
    }
    return true;
  },
};
