const { StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  OpenMenuBuilder: () => {
    return createOpenBuilder();
  },

  OpenRowBuilder: () => {
    const row = new ActionRowBuilder().addComponents([createOpenBuilder()]);
    return row;
  },
};

function createOpenBuilder() {
  const builder = new StringSelectMenuBuilder()
    .setCustomId(`open`)
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update issue status`)
    .addOptions([
      {
        label: "Fixed",
        description: `Mark the issue as fixed (forward it to retest phase).`,
        value: "fixed",
      },
      {
        label: "Deprecated",
        description: `Mark the issue as deprecated (outdated, need to improve).`,
        value: "deprecated",
      },
    ]);

  return builder;
}
