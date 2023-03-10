const { StopSlashBuilder } = require("../../builders/stop.builder");
const { ChatInputCommandInteraction } = require("discord.js");
const {
  NotInVoiceChannelEmbedBuilder,
} = require("../../../../common/builders/General");
const { DisTube } = require("distube");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");
const { logger } = require("../../../../common/utils/Utilities");
module.exports = {
  data: StopSlashBuilder(),

  /**
   * Stop playing music and clear queue
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await inVoiceChannel(interaction))) return;
    if (!(await isQueueExist(interaction, queue))) return;

    try {
      await queue.stop();
      await interaction.reply(`Stop playing!`);
      await queue.textChannel.send({ embeds: [QueueEmpty()] });
    } catch (error) {
      logger(error, interaction.user);
    }
  },
};
