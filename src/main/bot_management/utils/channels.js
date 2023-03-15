const { TextChannel } = require("discord.js");

module.exports = {
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @returns {TextChannel}
   */
  logs: (interaction) => {
    return interaction.client.channels.cache.get("1084882642182352946");
  },

  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @returns {TextChannel}
   */
  issues: (interaction) => {
    return interaction.client.channels.cache.get("1084869247706091640");
  },

  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @returns {TextChannel}
   */
  report: (interaction) => {
    return interaction.client.channels.cache.get("1085182593290469407");
  },

  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @returns {TextChannel}
   */
  future: (interaction) => {
    return interaction.client.channels.cache.get("1085182622797410384");
  },
};
