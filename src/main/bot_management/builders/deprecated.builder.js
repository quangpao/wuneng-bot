const {
  Message,
  User,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Message} message
   * @param {User} user
   */
  DeprecatedEmbedBuilder: (message, user, reason) => {
    const messageEmbed = message.embeds[0];
    const embed = new EmbedBuilder()
      .setTitle(messageEmbed.title)
      .setDescription(messageEmbed.description)
      .setURL(messageEmbed.url)
      .setTimestamp()
      .addFields([
        {
          name: `ㅤ`,
          value: `**Status**: Deprecated`,
        },
        {
          name: `Reason:`,
          value: reason || "N/A",
        },
      ])
      .setFooter({
        text: `Deprecated set by ${user.username}`,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });
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
