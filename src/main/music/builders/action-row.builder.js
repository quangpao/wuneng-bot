const { ActionRowBuilder } = require("discord.js");
const QueueBuilder = require("./queue.builder");
const JumpBuilder = require("./jump.builder");
const VolumeBuilder = require("./volume.builder");
const searchbuilder = require("./search.builder");
const { Song, Queue } = require("distube");

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
    const rows = [];

    if (previousSongs.length > 0) {
      rows.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.previousJumpMenuBuilder(previousSongs)
        )
      );
    }
    if (nextSongs.length > 1) {
      rows.push(
        new ActionRowBuilder().addComponents(
          JumpBuilder.nextJumpMenuBuilder(nextSongs)
        )
      );
    }
    return rows;
  },

  /**
   *
   * @param {Queue} queue
   */
  volumeRowBuilder: async (queue) => {
    const row = new ActionRowBuilder()
      .addComponents(VolumeBuilder.decreaseVolumeBuilder(queue.volume - 10))
      .addComponents(VolumeBuilder.increaseVolumeBuilder(queue.volume + 10));

    return row;
  },
  searchRowBuilder: async (songs) => {
    const row = new ActionRowBuilder();
    for (let i = 1; i < songs.length + 1; i++) {
      row.addComponents(
        searchbuilder.SelectSearchPlayButtonBuilder(i, songs[i - 1])
      );
    }
    return row;
  },
};
