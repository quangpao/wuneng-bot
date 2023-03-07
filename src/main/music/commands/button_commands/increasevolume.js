const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { volumeRowBuilder } = require("../../builders/action-row.builder");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { VolumeInfo } = require("../../builders/embeds/volume.embed");
const { increaseVolumeBuilder } = require("../../builders/volume.builder");
const { joinSpeakerCheck } = require("../../utils/permission.check");

module.exports = {
  data: increaseVolumeBuilder(),

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const /** @type {VoiceChannel} */ channel =
        interaction.member?.voice?.channel;
    if (channel === undefined || channel === null)
      return await interaction.reply({
        embeds: [NotInVoiceChannelEmbedBuilder()],
      });
    if (!joinSpeakerCheck(interaction, channel)) return;

    let queue = distube.getQueue(interaction.guildId);
    if (queue === undefined)
      return await interaction.reply({ embeds: [QueueEmpty()] });

    queue = distube.setVolume(
      interaction.guildId,
      parseInt(interaction.extraData)
    );

    await volumeRowBuilder(queue).then((row) => {
      interaction.update({
        embeds: [VolumeInfo(queue.volume)],
        components: [row],
      });
    });
  },
};
