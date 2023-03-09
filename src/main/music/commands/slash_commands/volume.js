const {
  ChatInputCommandInteraction,
  ButtonInteraction,
} = require("discord.js");
const { DisTube } = require("distube");
const { volumeRowBuilder } = require("../../builders/action-row.builder");
const { VolumeInfo } = require("../../builders/embeds/volume.embed");
const { slashBuilder } = require("../../builders/volume.builder");
const { isQueueExist } = require("../../utils/distube.check");
const {
  joinSpeakerCheck,
  inVoiceChannel,
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
    if (!joinSpeakerCheck(ButtonInteraction)) return;
    if (!isQueueExist(interaction, queue)) return;

    const row = await volumeRowBuilder(queue);
    await interaction.reply({
      embeds: [VolumeInfo(queue.volume)],
      components: [row],
    });
  },
};
