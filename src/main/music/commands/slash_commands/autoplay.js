const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube, Queue } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { AutoplaySlashBuilder } = require("../../builders/autoplay.builder");
const Autoplay = require("../../builders/embeds/autoplay.embed");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: AutoplaySlashBuilder(),

  /**
   * Distube autoplay toggle
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
    if (!(await canQueueExecutable(interaction, queue))) return;

    // Toggle autoplay
    try {
      toggleAutoplay(queue.toggleAutoplay(), interaction, queue);

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
