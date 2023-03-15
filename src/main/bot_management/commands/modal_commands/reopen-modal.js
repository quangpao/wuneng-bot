const { ModalSubmitInteraction, TextChannel } = require("discord.js");
const { OpenRowBuilder } = require("../../builders/open.builder");
const {
  ReopenModalBuilder,
  ReopenEmbedBuilder,
} = require("../../builders/reopen.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: ReopenModalBuilder(),

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   */
  execute: async (interaction) => {
    const reason = interaction.fields.getTextInputValue("reopen-reason");
    const reasonLink = interaction.fields.getTextInputValue("reason-link");
    const /** @type TextChannel */ textChannel = channels.issues(interaction);
    const sourceMessage = interaction.message;

    await interaction.update({ components: [] });

    await textChannel.send({
      embeds: [
        ReopenEmbedBuilder(sourceMessage, interaction.user, reason, reasonLink),
      ],
      components: [OpenRowBuilder()],
    });
  },
};
