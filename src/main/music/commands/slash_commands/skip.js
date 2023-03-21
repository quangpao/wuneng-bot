const { ChatInputCommandInteraction } = require("discord.js");
const { DisTube } = require("distube");
const { logger } = require("../../../../common/utils/Utilities");
const { SkipSong, NoSkip } = require("../../builders/embeds/skip.embed");
const { SkipSlashBuilder } = require("../../builders/skip.builder");
const { isQueueExist } = require("../../utils/distube.check");

module.exports = {
  data: SkipSlashBuilder(),

  /**
   * Skip current song and play next song
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
    if (queue.songs.length === 1 && !queue.autoplay)
      return await interaction.reply({ embeds: [NoSkip()] });

    try {
      const song = await queue.skip();
      await interaction.reply({ embeds: [SkipSong(song)] });

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
