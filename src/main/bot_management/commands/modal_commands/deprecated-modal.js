const { ModalSubmitInteraction, TextChannel } = require("discord.js");
const {
  DeprecatedModalBuilder,
  DeprecatedEmbedBuilder,
} = require("../../builders/deprecated.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: DeprecatedModalBuilder(),

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   */
  execute: async (interaction) => {
    const reason = interaction.fields.getTextInputValue("deprecated-reason");
    const /** @type TextChannel */ textChannel = channels.future(interaction);
    const sourceMessage = interaction.message;

    await interaction.update({ components: [] });

    await textChannel.send({
      embeds: [DeprecatedEmbedBuilder(sourceMessage, interaction.user, reason)],
    });
  },
};
