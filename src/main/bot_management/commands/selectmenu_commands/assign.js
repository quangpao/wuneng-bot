const { StringSelectMenuInteraction, TextChannel } = require("discord.js");
const { AssignBuilder } = require("../../builders/assign.builder");
const {
  OpenEmbedBuilder,
  OpenRowBuilder,
} = require("../../builders/open.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: AssignBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const chosen = interaction.values[0];
    const /** @type TextChannel */ textChannel = channels.issues(interaction);
    const sourceMessage = interaction.message;

    switch (chosen) {
      case "open": {
        await interaction.update({
          embeds: [OpenEmbedBuilder(sourceMessage)],
          components: [OpenRowBuilder(sourceMessage.id)],
        });
        break;
      }
      case "deferred": {
        // Remove old select menu and add issue to futute development
        break;
      }
      case "duplicated": {
        // Remove old select menu and mark as duplicated
        break;
      }
    }
  },
};
