const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { Resume, Pause } = require("../../builders/embeds/pause_resume.embed");
const { PauseSlashBuilder } = require("../../builders/pause_resume.builer");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");

module.exports = {
  data: PauseSlashBuilder(),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {{distube: DisTube}}
   */
  execute: async (interaction, { distube }) => {
    const queue = distube.getQueue(interaction.guildId);

    if (!inVoiceChannel(interaction)) return;
    if (!isQueueExist(interaction, queue)) return;

    if (distube.getQueue(interaction.guildId).paused) {
      distube.resume(interaction.guildId);
      await interaction.reply({ embeds: [Resume(queue)] });
    } else {
      distube.pause(interaction.guildId);
      await interaction.reply({ embeds: [Pause(queue)] });
    }
  },
};
