const { ActionRowBuilder } = require("discord.js");
const QueueBuilder = require("./queue.builder");
const JumpBuilder = require("./jump.builder");
const { Queue } = require("distube");

module.exports = {
  queueRowBuilder: async (page, maxPage) => {
    const row = new ActionRowBuilder()
      .addComponents(QueueBuilder.previousPageButtonBuilder(page))
      .addComponents(QueueBuilder.nextPageButtonBuilder(page, maxPage));
    return row;
  },

  /**
   * @param {Queue} queue
   * @returns {ActionRowBuilder[]}
   */
  jumpRowBuilder: async (queue) => {
    const row = [];

    if (queue.previousSongs.length > 0) {
      row.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.previousJumpMenuBuilder(queue.previousSongs)
        )
      );
    }
    if (queue.songs.length > 1) {
      row.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.nextJumpMenuBuilder(queue.songs)
        )
      );
    }
    return row;
  },
};
