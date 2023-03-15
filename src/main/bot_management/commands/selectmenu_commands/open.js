const { StringSelectMenuInteraction } = require("discord.js");
const { FixedModalBuilder } = require("../../builders/fixed.builder");
const { OpenBuilder } = require("../../builders/open.builder");

module.exports = {
  data: OpenBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const chosen = interaction.values[0];
    const sourceMessage = interaction.message

    switch (chosen) {
      case "fixed": {
        await interaction.showModal(FixedModalBuilder(sourceMessage.id));
        break;
      }
      case "transfer": {
        // Transfer the issue to the other developer
        break;
      }
      case "deprecated": {
        // Remove the issue and add it into the needing improvement list.
        break;
      }
    }
  },
};
