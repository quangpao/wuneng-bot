const { User } = require("discord.js");
const { dashLogger } = require("../classes/logger");

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
   *
   * @param {error} error
   * @param {User} user
   */
  logger: (error, user) => {
    console.error(error);
    dashLogger.error(`Error : ${error},Request : ${user.username}`);
  },
};
