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
   * Check if user is in voice channel
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @returns
   */
  inVoiceChannel: async (interaction) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;

    if (channel === undefined || channel === null) {
      await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });
      return false;
    }
    return true;
  },

  /**
   * Check if bot has permission to join and speak in voice channel
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @returns
   */
  joinSpeakerCheck: async (interaction) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;

    if (!channel.joinable) {
      await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.CONNECT)],
      });
      return false;
    }
    if (!channel.speakable) {
      await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SPEAK)],
      });
      return false;
    }
    return true;
  },

  /**
   * Check if bot has permission to send message
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {bigint} permission
   */
  hasPermission: async (interaction, permission) => {
    if (
      !interaction.channel
        .permissionsFor(interaction.guild.members.me)
        .has(permission)
    ) {
      await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SEND_MESSAGES)],
      });
      return false;
    }
    return true;
  },
};
