const {
  Message,
  User,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const Color = require("../../../common/utils/Color");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  DeprecatedEmbedBuilder: (message, user, reason) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle("🚫[Deprecated] The issue has been marked as deprecated")
      .setDescription(
        "The error has been marked as deprecated.\nCheck the `reason` for more information.\nㅤ"
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
          value: "`DEPRECATED`\nㅤ",
          inline: true,
        },
        {
          name: "Reason:",
          value: reason,
          inline: true,
        }
      )
      .setThumbnail(
        "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
      )
      .setColor(Color.ERROR.LIGHT)
      .setFooter({
        text: `Deprecated by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return embed;
  },

  DeprecatedModalBuilder: () => {
    const modal = new ModalBuilder()
      .setTitle("Deprecated issue reason")
      .setCustomId(`deprecated-modal`);

    const reason = new TextInputBuilder()
      .setCustomId("deprecated-reason")
      .setLabel("Reason deprecated the issue:")
      .setPlaceholder("Reason...")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const firstRow = new ActionRowBuilder().addComponents(reason);

    modal.addComponents(firstRow);

    return modal;
  },
};
