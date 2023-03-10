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
const { logger } = require("../../../../common/utils/Utilities");
module.exports = {
  data: PlayBuilder.slashBuilder(),

  /**
   * Play music from song name(youtube) or url
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await joinSpeakerCheck(interaction))) return;
    if (!(await hasPermission(interaction, PermissionFlagsBits.SendMessages)))
      return;

    try {
      const query = interaction.options.getString("song");
      await interaction.reply(`${Emoji.search} - Searching for \`${query}\``);
      await distube.play(channel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
    } catch (error) {
      logger(error, interaction.user);
    }

    await interaction.deleteReply();
  },
};
