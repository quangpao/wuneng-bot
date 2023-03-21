const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   */
  OpenEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Open] The issue has been opened")
      .setDescription(
        "The error has been opened by developer.\nIt will be fixed at soon at possible.\nㅤ"
      )
      .addFields(
        {
          name: messageEmbed.fields[0].name,
          value: messageEmbed.fields[0].value,
        },
        {
          name: messageEmbed.fields[1].name,
          value: messageEmbed.fields[1].value,
          inline: true,
        },
        {
          name: messageEmbed.fields[2].name,
          value: messageEmbed.fields[2].value,
          inline: true,
        },
        {
          name: messageEmbed.fields[3].name,
          value: "`OPEN`\nㅤ",
          inline: true,
        },
        {
          name: messageEmbed.fields[4].name,
          value: messageEmbed.fields[4].value,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Opened by ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp();
    return embed;
  },
};
