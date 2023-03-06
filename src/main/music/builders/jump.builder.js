const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");
const { Song } = require("distube");

module.exports = {
  slashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("jump")
      .setDescription("Jump to a specific song in the queue");
    return builder;
  },

  /**
   *
   * @param {Song[]} previousSongs
   */
  previousJumpMenuBuilder: (previousSongs = []) => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("previousjump")
      .setPlaceholder("Select Previous Song");
    for (let i = 0; i < previousSongs.length; i++) {
      builder.addOptions({
        label: `${previousSongs[i].name}`,
        description: `Song position: ${i - previousSongs.length}`,
        value: `${i - previousSongs.length}`,
      });
    }
    return builder;
  },

  /**
   *
   * @param {Song[]} nextSongs
   */
  nextJumpMenuBuilder: (nextSongs = []) => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("nextjump")
      .setPlaceholder("Select Next Song");
    for (let i = 1; i < nextSongs.length; i++) {
      builder.addOptions({
        label: `${nextSongs[i].name}`,
        description: `Song position: ${i}`,
        value: `${i}`,
      });
    }
    return builder;
  },
};
