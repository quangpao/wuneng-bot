const { ActionRowBuilder } = require("discord.js");
const QueueBuilder = require("./queue.builder");
const JumpBuilder = require("./jump.builder");
const { Song } = require("distube");

module.exports = {
  queueRowBuilder: async (page, maxPage) => {
    const row = new ActionRowBuilder()
      .addComponents(QueueBuilder.previousPageButtonBuilder(page))
      .addComponents(QueueBuilder.nextPageButtonBuilder(page, maxPage));
    return row;
  },

  /**
   * @param {Song[]} previousSongs
   * @param {Song[]} nextSongs
   * @returns {Promise<ActionRowBuilder[]>}
   */
  jumpRowBuilder: async (previousSongs, nextSongs) => {
    const row = [];

    if (previousSongs.length > 0) {
      row.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.previousJumpMenuBuilder(previousSongs)
        )
      );
    }
    if (nextSongs.length > 1) {
      row.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.nextJumpMenuBuilder(nextSongs)
        )
      );
    }
    return row;
  },
};
