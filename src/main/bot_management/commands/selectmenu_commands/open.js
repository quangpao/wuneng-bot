const { StringSelectMenuInteraction } = require("discord.js");
const { DeprecatedModalBuilder } = require("../../builders/deprecated.builder");
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

    switch (chosen) {
      case "fixed": {
        await interaction.showModal(FixedModalBuilder());
        break;
      }
      case "deprecated": {
        await interaction.showModal(DeprecatedModalBuilder());
        break;
      }
    }
  },
};
