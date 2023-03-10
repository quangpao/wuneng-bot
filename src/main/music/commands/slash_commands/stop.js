const { StopSlashBuilder } = require("../../builders/stop.builder");
const { ChatInputCommandInteraction } = require("discord.js");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { DisTube } = require("distube");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");
module.exports = {
  data: StopSlashBuilder(),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;

    await distube.stop(interaction.guildId);
    await interaction.reply(`Stop playing!`);
    await queue.textChannel.send({ embeds: [QueueEmpty()] });
  },
};
