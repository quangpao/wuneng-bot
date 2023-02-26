const { EmbedBuilder } = require("discord.js");
const { ERROR } = require("../utils/Color");

module.exports = {
  InsufficientPermissionEmbedBuilder: (permission) => {
    const embed = new EmbedBuilder()
      .setTitle("Insufficient Permission")
      .setDescription(
        `The bot need ${permission} permission to use this command`
      )
      .setColor(ERROR.LIGHT);
    return embed;
  },
};
