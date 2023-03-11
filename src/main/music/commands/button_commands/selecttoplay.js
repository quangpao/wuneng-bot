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
   * @param {{cooldown: Set, cooldownTime: number ,distube: DisTube}}
   */
  execute: async (interaction, { cooldown, cooldownTime, distube }) => {
    if (cooldown.has(interaction.user.id)) {
      await interaction.reply({
        content: `Please wait ${
          cooldownTime / 1000
        } more second(s) before reusing the command.`,
        ephemeral: true,
      });
      return;
    }

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

      // Add user to cooldown
      cooldown.add(interaction.user.id);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    } catch (error) {
      logger(error, interaction);
    }
  },
};
