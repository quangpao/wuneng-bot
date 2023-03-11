const { ButtonInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { queueRowBuilder } = require("../../builders/action-row.builder");
const { Queue } = require("../../builders/embeds/queue.embed");
const { previousPageButtonBuilder } = require("../../builders/queue.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: previousPageButtonBuilder(),

  /**
   * Previous page of queue
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

    const queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;

    // Queue variable declaration
    let maxPage = Math.ceil((queue.songs.length - 1) / 5);
    maxPage = maxPage > 0 ? maxPage : 1;
    if (interaction.extraData > 1) {
      interaction.extraData--;
    }

    try {
      const row = await queueRowBuilder(interaction.extraData, maxPage);
      await interaction.update({
        embeds: [Queue(queue, interaction.extraData, maxPage)],
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
