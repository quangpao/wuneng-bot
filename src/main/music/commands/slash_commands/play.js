const { ChatInputCommandInteraction, VoiceChannel } = require("discord.js");
const { SearchResultType } = require("distube");
const WNClient = require("../../../../common/classes/WNClient");
const PlayBuilder = require("../../builders/play.builder");
const Permission = require("../../../../common/messages/permissions");
const {
  InsufficientPermissionEmbedBuilder,
} = require("../../../../common/builders/General");
module.exports = {
  data: PlayBuilder.slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {WNClient} client
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (!channel.joinable)
      return await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.CONNECT)],
      });
    if (!channel.speakable)
      return await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SPEAK)],
      });

    const query = interaction.options.getString("song");
    await interaction.deferReply(); // Send a loading state

    await distube.play(channel, query, {
      textChannel: interaction.channel,
      member: interaction.member,
    });

    await interaction.editReply("Searching done!"); // Delete the loading state
  },
};
