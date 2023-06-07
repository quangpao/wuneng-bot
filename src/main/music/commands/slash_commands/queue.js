const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { queueRowBuilder } = require("../../builders/action-row.builder");
const { Queue, QueueAutoplay } = require("../../builders/embeds/queue.embed");
const { QueueSlashBuilder } = require("../../builders/queue.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  info: {
    name: "queue",
    description: "Show the song queue and some common information.",
  },

  data: QueueSlashBuilder(),

  /**
   * Show queue list
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
    if (!(await isQueueExist(interaction, queue))) return;
    if (queue.autoplay)
      return await interaction.reply({ embeds: [QueueAutoplay(queue)] });

    // queue const variable declaration
    const queueLength = queue.songs.length;
    const currentPage = 1;
    const maxPage = Math.ceil((queueLength - 1) / 5);

    try {
      const row = await queueRowBuilder(currentPage, maxPage);
      await interaction.reply({
        embeds: [Queue(queue, currentPage, maxPage)],
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
