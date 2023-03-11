const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { ShuffeItSelf } = require("../../builders/embeds/shuffle.embed");
const { slashBuilder } = require("../../builders/shuffle.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: slashBuilder(),

  /**
   * Shuffle queue list
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

    let queue = distube.getQueue(interaction.guildId);

    // Permission check
    if (!(await isQueueExist(interaction, queue))) return;
    if (queue.songs.length === 1)
      return await interaction.reply({ embeds: [ShuffeItSelf()] });

    try {
      queue = await queue.shuffle();
      await interaction.reply("Queue shuffled");

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
