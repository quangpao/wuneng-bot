const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  FixedModalBuilder: () => {
    const modal = new ModalBuilder()
      .setTitle("Resolve issue information")
      .setCustomId(`fixed-modal`);

    const timeEffort = new TextInputBuilder()
      .setCustomId("time-effort")
      .setLabel("Time resolving effort:")
      .setPlaceholder("How long did you spend on resolving this issue?")
      .setStyle(TextInputStyle.Short);

    const mergeRequest = new TextInputBuilder()
      .setCustomId("merge-request")
      .setLabel("Merge request:")
      .setPlaceholder("Link to merge request")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const firstRow = new ActionRowBuilder().addComponents(timeEffort);
    const secondRow = new ActionRowBuilder().addComponents(mergeRequest);

    modal.addComponents(firstRow, secondRow);

    return modal;
  },
};
