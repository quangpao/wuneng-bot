const {
  ChatInputCommandInteraction,
  VoiceChannel,
  PermissionFlagsBits,
} = require("discord.js");
const { DisTube } = require("distube");
const PlayBuilder = require("../../builders/play.builder");
const Emoji = require("../../../../common/utils/Emoji");
const {
  joinSpeakerCheck,
  inVoiceChannel,
  hasPermission,
} = require("../../utils/permission.check");
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

    if (!inVoiceChannel(interaction)) return;
    if (!joinSpeakerCheck(interaction)) return;
    if (!hasPermission(interaction, PermissionFlagsBits.SendMessages)) return;

    const query = interaction.options.getString("song");
    await interaction.reply(`${Emoji.search} - Searching for \`${query}\``);
    await distube.play(channel, query, {
      textChannel: interaction.channel,
      member: interaction.member,
    });

    await interaction.deleteReply();
  },
};
