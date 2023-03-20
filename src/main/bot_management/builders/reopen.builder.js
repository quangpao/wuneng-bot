const {
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Message,
  User,
} = require("discord.js");
const Color = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   * @param {string} reason
   * @param {string} reasonLink
   * @returns
   */
  ReopenEmbedBuilder: (message, user, reason, reasonLink) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Reopened] The issue has been reopened")
      .setDescription(
        "The error has been reopen due to verify problem.\nIt will be assign the the developer again.\nㅤ"
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
          name: "Status:",
          value: "`REOPENED`\nㅤ",
          inline: true,
        },
        {
          name: "Reopen reason:",
          value: `${reason}\nMerge link: [Merge](${reasonLink})`,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setTimestamp()
      .setFooter({
        text: `Reopened by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
    return embed;
  },

  ReopenModalBuilder: () => {
    const modal = new ModalBuilder()
      .setTitle("Reopen issue reason")
      .setCustomId(`reopen-modal`);

    const reason = new TextInputBuilder()
      .setCustomId("reopen-reason")
      .setLabel("Reason reopen the issue:")
      .setPlaceholder("Reason...")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const reasonLink = new TextInputBuilder()
      .setCustomId("reason-link")
      .setLabel("Link:")
      .setPlaceholder("Link to reopen reason")
      .setRequired(false)
      .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder().addComponents(reason);
    const secondRow = new ActionRowBuilder().addComponents(reasonLink);

    modal.addComponents(firstRow, secondRow);

    return modal;
  },
};
