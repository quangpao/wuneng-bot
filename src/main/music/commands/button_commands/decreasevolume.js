const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { volumeRowBuilder } = require("../../builders/action-row.builder");
const { VolumeInfo } = require("../../builders/embeds/volume.embed");
const { decreaseVolumeBuilder } = require("../../builders/volume.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: decreaseVolumeBuilder(),

  /**
   * Decrease volume of music player
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

    let queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await joinSpeakerCheck(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      // Decrease volume
      queue = queue.setVolume(parseInt(interaction.extraData));

      const row = await volumeRowBuilder(queue);
      await interaction.update({
        embeds: [VolumeInfo(queue.volume, false)],
        components: [row],
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
