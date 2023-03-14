/* eslint-disable default-case */
const { StringSelectMenuInteraction, TextChannel } = require("discord.js");
const { OpenBuilder } = require("../../builders/open.builder");

module.exports = {
  data: OpenBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const chosen = interaction.values[0];
    const /** @type TextChannel */ textChannel =
        interaction.client.channels.cache.get("1084869247706091640");
    const sourceMessage = await textChannel.messages.fetch(
      interaction.extraData
    );

    switch (chosen) {
      case "fixed": {
        // Send status to fixed and call fixed command to popup the modal to input the fix commit link
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
