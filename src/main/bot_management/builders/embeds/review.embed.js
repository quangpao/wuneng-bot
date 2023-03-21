const { EmbedBuilder } = require("discord.js");
const Color = require("../../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  VerifiedEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Verified] The issue has been verified")
      .setDescription(
        "The error has been verified.\nIt will be added in the next version.\nㅤ"
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
          value: "`VERIFIED`\nㅤ",
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
        text: `Verified by ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp();
    return embed;
  },

  /**
   *
   * @param {Message} message
   * @param {User} user
   * @returns
   */
  ClosedEmbedBuilder: (message, user) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Closed] The issue has been closed")
      .setDescription(
        "The error has been closed as fixed.\nIt will be added in the next version.\nㅤ"
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
          value: "`CLOSED`\nㅤ",
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
        text: `Closed by ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp();
    return embed;
  },
};
