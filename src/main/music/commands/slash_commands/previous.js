const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const {
  NoPrevious,
  PreviousSong,
} = require("../../builders/embeds/previous.embed");
const { PreviousSlashBuilder } = require("../../builders/previous.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: PreviousSlashBuilder(),

  /**
   * Play previous song
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
    if (queue.previousSongs.length === 0)
      return await interaction.reply({
        embeds: [NoPrevious()],
      });

    try {
      const song = await queue.previous();
      await interaction.reply({ embeds: [PreviousSong(song)] });

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
