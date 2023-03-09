const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
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
   *
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    let queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!joinSpeakerCheck(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;

    queue = distube.setVolume(
      interaction.guildId,
      parseInt(interaction.extraData)
    );

    const row = await volumeRowBuilder(queue);
    await interaction.update({
      embeds: [VolumeInfo(queue.volume, false)],
      components: [row],
    });
  },
};
