const { StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  ReviewMenuBuilder: () => {
    return createReviewBuilder();
  },

  ReviewRowBuilder: () => {
    const row = new ActionRowBuilder().addComponents([createReviewBuilder()]);
    return row;
  },
};

function createReviewBuilder() {
  const builder = new StringSelectMenuBuilder()
    .setCustomId(`review`)
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder(`Update review status`)
    .addOptions([
      {
        label: "Verified",
        description: `Mark the issue as verified (close it as done).`,
        value: "verified",
      },
      {
        label: "Reopen",
        description: `Mark the issue as reopen, assign it again to developer.`,
        value: "reopen",
      },
    ]);

  return builder;
}
