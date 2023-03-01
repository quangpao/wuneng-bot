const {
  ChatInputCommandInteraction,
  VoiceChannel,
  PermissionFlagsBits,
} = require("discord.js");
const { DisTube } = require("distube");
const PlayBuilder = require("../../builders/play.builder");
const Permission = require("../../../../common/messages/permissions");
const {
  InsufficientPermissionEmbedBuilder,
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const Emoji = require("../../../../common/utils/Emoji");
const { joinSpeakerCheck } = require("../../utils/permission.check");
module.exports = {
  data: PlayBuilder.slashBuilder(),

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
    if (!joinSpeakerCheck(interaction, channel)) return;
    if (
      !interaction.channel
        .permissionsFor(interaction.guild.members.me)
        .has(PermissionFlagsBits.SendMessages)
    )
      return await interaction.reply({
        embeds: [InsufficientPermissionEmbedBuilder(Permission.SEND_MESSAGES)],
      });

    const query = interaction.options.getString("song");
    await interaction.reply(`${Emoji.search} - Searching for \`${query}\``);

    await distube.play(channel, query, {
      textChannel: interaction.channel,
      member: interaction.member,
    });

    await interaction.editReply(`${Emoji.search} - Searching done`);
  },
};
