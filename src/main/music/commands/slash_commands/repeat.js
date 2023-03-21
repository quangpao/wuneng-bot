const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube, Queue } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const {
  AlrAutoplay,
  SongRepeatMode,
  QueueRepeatMode,
  DisabledRepeatMode,
} = require("../../builders/embeds/repeat.embed");
const { RepeatSlashBuilder } = require("../../builders/repeat.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: RepeatSlashBuilder(),

  /**
   * Toggle repeat mode (off, song, queue)
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
    if (queue.autoplay)
      return await interaction.reply({ embeds: [AlrAutoplay()] });

    try {
      // Toggle repeat mode
      const toggle = interaction.options.getString("toggle");
      await setRepeatMode(interaction, queue, toggle);

      // Add user to cooldown
      cooldown.add(interaction.user.id);
      setTimeout(() => {
        cooldown.delete(interaction.user.id);
      }, cooldownTime);
    } catch (error) {
      logger(error, interaction, interaction.options.getString("toggle"));
    }
  },
};

/**
 * Set repeat mode base on toggle value
 * @param {ChatInputCommandInteraction} interaction
 * @param {Queue} queue
 * @param {number} toggle
 */
async function setRepeatMode(interaction, queue, toggle) {
  switch (toggle) {
    case "1": {
      queue.setRepeatMode(1);
      await interaction.reply({
        embeds: [SongRepeatMode(queue.songs[0], interaction.member)],
      });
      break;
    }

    case "2": {
      queue.setRepeatMode(2);
      await interaction.reply({
        embeds: [QueueRepeatMode(queue, interaction.member)],
      });
      break;
    }

    default: {
      queue.setRepeatMode(0);
      await interaction.reply({ embeds: [DisabledRepeatMode()] });
    }
  }
}
