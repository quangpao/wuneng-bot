const {
  ButtonInteraction,
  PermissionFlagsBits,
  VoiceChannel,
} = require("discord.js");
const { DisTube } = require("distube");
const {
  joinSpeakerCheck,
  inVoiceChannel,
  hasPermission,
} = require("../../utils/permission.check");
const {
  SelectSearchPlayButtonBuilder,
} = require("../../builders/search.builder");
const { logger } = require("../../../../common/utils/Utilities");

module.exports = {
  data: SelectSearchPlayButtonBuilder(),

  /**
   * Play music from search result list
   * @param {ButtonInteraction} interaction
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
      await distube.play(channel, interaction.extraData, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
    } catch (error) {
      logger(error, interaction);
    }
  },
};
