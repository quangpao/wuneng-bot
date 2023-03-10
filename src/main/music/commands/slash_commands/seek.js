const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { slashBuilder } = require("../../builders/seek.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  inVoiceChannel,
  joinSpeakerCheck,
} = require("../../utils/permission.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Seek to a position in the current song (in seconds)
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
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
    } catch (error) {
      logger(error, interaction.user);
    }

    await interaction.reply("Song seek to..."); // SeekPosition
  },
};
