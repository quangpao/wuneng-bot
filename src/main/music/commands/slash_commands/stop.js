const { StopSlashBuilder } = require("../../builders/stop.builder");
const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { QueueEmpty } = require("../../builders/embeds/queue.embed");
const { isQueueExist } = require("../../utils/distube.check");
const { inVoiceChannel } = require("../../utils/permission.check");
const { logger } = require("../../../../common/utils/Utilities");
module.exports = {
  info: {
    name: "stop",
    description: "Stop playing the song and clear the whole queue.",
  },
  data: StopSlashBuilder(),

  /**
   * Stop playing music and clear queue
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
      await queue.stop();
      await interaction.reply(`Stop playing!`);
      await queue.textChannel.send({ embeds: [QueueEmpty()] });

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
