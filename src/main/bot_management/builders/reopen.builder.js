const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
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
