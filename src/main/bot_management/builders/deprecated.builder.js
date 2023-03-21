const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
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
