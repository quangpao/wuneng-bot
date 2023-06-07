const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { SeekSlashBuilder } = require("../../builders/seek.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  inVoiceChannel,
  joinSpeakerCheck,
} = require("../../utils/permission.check");

module.exports = {
  info: {
    name: "seek [duration]",
    description:
      "Seek the specific duration of the current song.<br><br>Example: `/seek 100`.\nSeek the position 1m40s (1 minute 40 seconds)",
  },
  data: SeekSlashBuilder(),

  /**
   * Seek to a position in the current song (in seconds)
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

    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await joinSpeakerCheck(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      const duration = interaction.options.getNumber("duration");
      if (duration >= queue.songs[0].duration)
        return await interaction.reply("Can't seek to this position"); // SeekOutBound

      queue.seek(duration);

      // Add user to cooldown
      cooldown.add(interaction.user.id);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    } catch (error) {
      logger(
        error,
        interaction,
        interaction.options.getNumber("duration").toString()
      );
    }

    await interaction.reply("Song seek to..."); // SeekPosition
  },
};
