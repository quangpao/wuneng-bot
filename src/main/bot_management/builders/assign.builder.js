const { StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  AssignMenuBuilder: () => {
    return createAssignBuilder();
  },

  AssignRowBuilder: () => {
    const row = new ActionRowBuilder().addComponents([createAssignBuilder()]);
    return row;
  },
};

function createAssignBuilder() {
  const builder = new StringSelectMenuBuilder()
    .setCustomId(`assign`)
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update issue status`)
    .addOptions([
      {
        label: "Open",
        description: `Add the issue to todo-list.`,
        value: "open",
      },
      {
        label: `Deferred`,
        description: `Mark the issue as deferred (won't fix right away).`,
        value: "deferred",
      },
      {
        label: "Duplicated",
        description: `Mark the issue as duplicated (already existed in todo-list)`,
        value: "duplicated",
      },
    ]);

  return builder;
}
