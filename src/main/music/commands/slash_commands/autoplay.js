const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube, Queue } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { slashBuilder } = require("../../builders/autoplay.builder");
const Autoplay = require("../../builders/embeds/autoplay.embed");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Distube autoplay toggle
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await joinSpeakerCheck(interaction))) return;
    if (!(await canQueueExecutable(interaction, queue))) return;

    // Toggle autoplay
    try {
      toggleAutoplay(queue.toggleAutoplay(), interaction, queue);
    } catch (error) {
      logger(error, interaction);
    }
  },
};

/**
 * Check if queue is play from youtube
 * @param {ChatInputCommandInteraction} interaction
 * @param {Queue} queue
 * @returns
 */
async function canQueueExecutable(interaction, queue) {
  if (!(await isQueueExist(interaction, queue))) return false;
  if (queue.songs[0].source !== "youtube") {
    await interaction.reply({ embeds: [Autoplay.NotYoutube()] });
    return false;
  }
  return true;
}

/**
 * Toggle autoplay
 * @param {boolean} autoplay
 * @param {ChatInputCommandInteraction} interaction
 * @param {Queue} queue
 */
async function toggleAutoplay(autoplay, interaction, queue) {
  if (autoplay) {
    await interaction.reply({ embeds: [Autoplay.AutoplayOn(queue)] });
  } else {
    await interaction.reply({ embeds: [Autoplay.AutoplayOff(queue)] });
  }
}
