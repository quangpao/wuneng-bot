const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");
const { Song } = require("distube");

module.exports = {
  JumpSlashBuilder: () => {
    const builder = new SlashCommandBuilder()
      .setName("jump")
      .setDescription("Jump to a specific song in the queue");
    return builder;
  },

  /**
   *
   * @param {Song[]} previousSongs
   */
  PreviousJumpMenuBuilder: (previousSongs = []) => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("previousjump")
      .setPlaceholder("Select Previous Song");
    for (let i = 0; i < previousSongs.length && i < 25; i++) {
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
  NextJumpMenuBuilder: (nextSongs = []) => {
    const builder = new StringSelectMenuBuilder()
      .setCustomId("nextjump")
      .setPlaceholder("Select Next Song");
    for (let i = 1; i < nextSongs.length && i < 26; i++) {
      builder.addOptions({
        label: `${nextSongs[i].name}`,
        description: `Song position: ${i}`,
        value: `${i}`,
      });
    }
    return builder;
  },
};
