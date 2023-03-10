const {
  ButtonInteraction,
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
} = require("discord.js");
const { Queue } = require("distube");
const { NoSongJump } = require("../builders/embeds/jump.embed");
const { QueueEmpty } = require("../builders/embeds/queue.embed");

module.exports = {
  /**
   * Check if queue exist
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {Queue} queue
   * @returns
   */
  isQueueExist: async (interaction, queue) => {
    if (queue === undefined) {
      await interaction.reply({ embeds: [QueueEmpty()] });
      return false;
    }
    return true;
  },

  /**
   * Check if queue is jumpable (not only 1 song in queue)
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {Queue} queue
   * @returns
   */
  isJumpable: async (interaction, queue) => {
    if (queue.songs.length === 1 && queue.previousSongs.length === 0) {
      await interaction.reply({ embeds: [NoSongJump()] });
      return false;
    }
    return true;
  },
};
