const { ActionRowBuilder } = require("discord.js");
const QueueBuilder = require("./queue.builder");
const JumpBuilder = require("./jump.builder");
const VolumeBuilder = require("./volume.builder");
const searchbuilder = require("./search.builder")
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

  /**
   *
   * @param {Queue} queue
   */
  volumeRowBuilder: async (queue) => {
    const row = new ActionRowBuilder()
      .addComponents(VolumeBuilder.decreaseVolumeBuilder(queue.volume - 5))
      .addComponents(VolumeBuilder.increaseVolumeBuilder(queue.volume + 5));
    return row;
  },
  searchRowBuilder: async (songArr) => {
    const row = new ActionRowBuilder()
    for (let i = 1; i < 6; i++) {
      row.addComponents(searchbuilder.SelectSearchPlayButtonBuilder(i, songArr[i - 1]));
    }
    return row;
  },
};
