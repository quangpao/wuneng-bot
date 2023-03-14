const { ModalSubmitInteraction } = require("discord.js");
const {
  FixedModalBuilder,
  FixedEmbedBuilder,
} = require("../../builders/fixed.builder");
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
    const sourceMessage = await channels
      .issues(interaction)
      .messages.fetch(interaction.extraData);

    await interaction.update({
      components: [],
    });

    await channels.report(interaction).send({
      content: `The issue has been fixed and requested a review`,
      embeds: [FixedEmbedBuilder(sourceMessage, timeEffort, mergeRequest)],
    });
  },
};
