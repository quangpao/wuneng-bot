const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube, Queue } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { Resume, Pause } = require("../../builders/embeds/pause-resume.embed");
const { PauseSlashBuilder } = require("../../builders/pause-resume.builder");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: PauseSlashBuilder(),

  /**
   * Pause or resume music
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      // Pause or resume music handler
      await pauseResumeHandler(interaction, queue);
    } catch (error) {
      logger(error, interaction);
    }
  },
};

/**
 * Pause or resume music handler
 * @param {ChatInputCommandInteraction} interaction
 * @param {Queue} queue
 */
async function pauseResumeHandler(interaction, queue) {
  if (queue.paused) {
    queue.resume();
    await interaction.reply({ embeds: [Resume(queue)] });
  } else {
    queue.pause();
    await interaction.reply({ embeds: [Pause(queue)] });
  }
}
