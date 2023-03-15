const { ModalSubmitInteraction } = require("discord.js");
const {
  FixedModalBuilder,
  FixedEmbedBuilder,
} = require("../../builders/fixed.builder");
const { ReviewRowBuilder } = require("../../builders/review.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: FixedModalBuilder(),

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   */
  execute: async (interaction) => {
    const timeEffort = interaction.fields.getTextInputValue("time-effort");
    const mergeRequest = interaction.fields.getTextInputValue("merge-request");
    const sourceMessage = interaction.message;

    await interaction.update({ components: [] });

    await channels.report(interaction).send({
      embeds: [FixedEmbedBuilder(sourceMessage, timeEffort, mergeRequest)],
      components: [ReviewRowBuilder()],
    });
  },
};
