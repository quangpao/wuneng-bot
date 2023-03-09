const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { slashBuilder } = require("../../builders/seek.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  inVoiceChannel,
  joinSpeakerCheck,
} = require("../../utils/permission.check");

module.exports = {
  data: slashBuilder(),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!joinSpeakerCheck(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;

    const duration = interaction.options.getNumber("duration");
    if (duration >= queue.songs[0].duration)
      return await interaction.reply("Can't seek to this position"); // SeekOutBound

    distube.seek(interaction.guildId, duration);

    await interaction.reply("Song seek to..."); // SeekPosition
  },
};
