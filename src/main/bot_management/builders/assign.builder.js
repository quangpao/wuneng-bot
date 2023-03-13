const { EmbedBuilder, Message, User } = require("discord.js");
const { INFO } = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} assigner
   * @param {string} id
   * @returns
   */
  AssignEmbedBuilder: (message, assigner, id) => {
    const embed = new EmbedBuilder()
      .setTitle(`Issue ID: ${id}`)
      .setDescription(`Assign to: <@${assigner.id}>`)
      .setURL(message.url)
      .setTimestamp()
      .setColor(INFO.DARK);
    return embed;
  },

  AssignRowBuilder: (id = undefined) => {},
};
