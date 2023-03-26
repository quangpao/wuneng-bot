const {
  ChatInputCommandInteraction,
  ButtonInteraction,
  StringSelectMenuInteraction,
} = require("discord.js");
const {
  IssueEmbedBuilder,
} = require("../../main/bot_management/builders/embeds/issue.embed");
const {
  IssueRowBuilder,
} = require("../../main/bot_management/builders/issue.builder");
const channels = require("../../main/bot_management/utils/channels");

module.exports = {
  delay: (ms) => new Promise((res) => setTimeout(res, ms)),

  /**
   * Formats a number to a short version (e.g. 1000 -> 1K)
   * @param {Number} number
   * @returns {String}
   */
  formatNumber: (number) => {
    if (isNaN(number)) return number;
    if (number < 1000) return number;
    if (number < 1000000) return +(number / 1000).toFixed(1) + " K";
    if (number < 1000000000) return +(number / 1000000).toFixed(1) + " M";
    if (number < 1000000000000) return +(number / 1000000000).toFixed(1) + " B";
    return +(number / 1000000000000).toFixed(1) + " T";
  },

  /**
   * Logger for error handling into .log file
   * @param {error} error
   * @param {ChatInputCommandInteraction | ButtonInteraction | StringSelectMenuInteraction} interaction
   */
  logger: (error, interaction, suffix) => {
    const id = idGenerator();
    interaction.channel.send({
      embeds: [IssueEmbedBuilder(interaction, error, id, suffix)],
    });
    channels.logs(interaction).send({
      embeds: [IssueEmbedBuilder(interaction, error, id, suffix)],
      components: [IssueRowBuilder(id)],
    });
  },
};

/**
 * Generates a ID from timestamp
 */
function idGenerator() {
  return new Date().getTime().toString(14);
}
