const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { volumeRowBuilder } = require("../../builders/action-row.builder");
const { VolumeInfo } = require("../../builders/embeds/volume.embed");
const { increaseVolumeBuilder } = require("../../builders/volume.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
} = require("../../utils/permission.check");

module.exports = {
  data: increaseVolumeBuilder(),

  /**
   * Increase volume of music player
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    let queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await joinSpeakerCheck(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      // Increase volume
      queue = queue.setVolume(parseInt(interaction.extraData));

      const row = await volumeRowBuilder(queue);
      await interaction.update({
        embeds: [VolumeInfo(queue.volume)],
        components: [row],
      });
    } catch (error) {
      logger(error, interaction);
    }
  },
};
