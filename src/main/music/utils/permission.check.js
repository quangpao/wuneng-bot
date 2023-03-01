const { VoiceChannel } = require("discord.js");
const {
  InsufficientPermissionEmbedBuilder,
} = require("../../../common/builders/General");
const Permission = require("../../../common/messages/permissions");

module.exports = {
  /**
   * @param {VoiceChannel} channel
   */
  joinSpeakerCheck: async (interaction, channel) => {
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
};
