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
   *
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {Queue} queue
   * @returns
   */
  isQueueExist: (interaction, queue) => {
    if (queue === undefined) {
      interaction.reply({ embeds: [QueueEmpty()] });
      return false;
    }
    return true;
  },

  /**
   *
   * @param {ButtonInteraction | ChatInputCommandInteraction | StringSelectMenuInteraction} interaction
   * @param {Queue} queue
   * @returns
   */
  isJumpable: (interaction, queue) => {
    if (queue.songs.length === 1 && queue.previousSongs.length === 0) {
      interaction.reply({ embeds: [NoSongJump()] });
      return false;
    }
    return true;
  },
};
