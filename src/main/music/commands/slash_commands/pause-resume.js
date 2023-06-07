const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube, Queue } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { Resume, Pause } = require("../../builders/embeds/pause-resume.embed");
const { PauseSlashBuilder } = require("../../builders/pause-resume.builder");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  info: {
    name: "pause",
    description:
      "`Pause/Resume` the song temporarily.\n**Note**: This can be used to handle both _pause/resume_ options.",
  },

  data: PauseSlashBuilder(),

  /**
   * Pause or resume music
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
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      // Pause or resume music handler
      await pauseResumeHandler(interaction, queue);

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
