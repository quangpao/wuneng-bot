const {
  ChatInputCommandInteraction,
  VoiceChannel,
  PermissionFlagsBits,
} = require("discord.js");
const { DisTube } = require("distube");
const Emoji = require("../../../../common/utils/Emoji");
const {
  joinSpeakerCheck,
  inVoiceChannel,
  hasPermission,
} = require("../../utils/permission.check");
const { logger } = require("../../../../common/utils/Utilities");
const { PlaySlashBuilder } = require("../../builders/play.builder");

module.exports = {
  data: PlaySlashBuilder(),

  /**
   * Play music from song name(youtube) or url
   * @param {ChatInputCommandInteraction} interaction
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
      const query = interaction.options.getString("song");
      await interaction.reply(`${Emoji.search} - Searching for \`${query}\``);
      await distube.play(channel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });

      // Add user to cooldown
      cooldown.add(interaction.user.id);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    } catch (error) {
      logger(error, interaction, interaction.options.getString("song"));
    }

    await interaction.deleteReply();
  },
};
