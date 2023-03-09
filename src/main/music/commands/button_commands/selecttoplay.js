const { ButtonInteraction, PermissionFlagsBits } = require("discord.js");
const { DisTube } = require("distube");
const {
  joinSpeakerCheck,
  inVoiceChannel,
  hasPermission,
} = require("../../utils/permission.check");
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

    if (!inVoiceChannel(interaction)) return;
    if (!joinSpeakerCheck(interaction)) return;
    if (!hasPermission(interaction, PermissionFlagsBits.SendMessages)) return;

    await distube.play(channel, interaction.extraData, {
      textChannel: interaction.channel,
      member: interaction.member,
    });
  },
};
