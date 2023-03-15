const {
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Message,
  User,
} = require("discord.js");

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
    {
      const messageEmbed = message.embeds[0];
      const embed = new EmbedBuilder()
        .setTitle(`${messageEmbed.title}`)
        .setDescription(`${messageEmbed.description}`)
        .setURL(`${messageEmbed.url}`)
        .setTimestamp()
        .addFields([
          {
            name: `ㅤ`,
            value: `**Status**: Reopen`,
          },
          {
            name: `Reason:`,
            value: reason,
          },
          {
            name: `ㅤ`,
            value: reasonLink,
          },
        ])
        .setFooter({
          text: `Reopen by ${user.username}`,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        });
      return embed;
    }
  },

  ReopenModalBuilder: (id = undefined) => {
    const modal = new ModalBuilder().setTitle("Reopen issue reason");

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

    if (id) {
      modal.setCustomId(`reopen-modal ${id}`);
    } else {
      modal.setCustomId(`reopen-modal`);
    }

    return modal;
  },
};
