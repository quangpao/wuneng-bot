const { ActionRowBuilder, UserSelectMenuBuilder } = require("discord.js");

module.exports = {
  IssueMentionBuilder: () => {
    return createIssueMentionBuilder();
  },

  IssueRowBuilder: () => {
    const row = new ActionRowBuilder().addComponents(
      createIssueMentionBuilder()
    );
    return row;
  },
};

function createIssueMentionBuilder() {
  const mentionBuilder = new UserSelectMenuBuilder()
    .setCustomId(`issue`)
    .setPlaceholder("Assign to a developer")
    .setMinValues(1)
    .setMaxValues(1);

  return mentionBuilder;
}
