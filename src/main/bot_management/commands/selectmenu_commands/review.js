const { StringSelectMenuInteraction, TextChannel } = require("discord.js");
const {
  ReviewBuilder,
  VerifiedEmbedBuilder,
  ClosedEmbedBuilder,
} = require("../../builders/review.builder");
const channels = require("../../utils/channels");

module.exports = {
  data: ReviewBuilder(),

  /**
   *
   * @param {StringSelectMenuInteraction} interaction
   */
  execute: async (interaction) => {
    const chosen = interaction.values[0];
    const /** @type TextChannel */ textChannel = channels.future(interaction);
    const sourceMessage = interaction.message;

    switch (chosen) {
      case "verified": {
        interaction.update({
          content: "",
          embeds: [VerifiedEmbedBuilder(sourceMessage, interaction.user)],
          components: [],
        });

        textChannel.send({
          embeds: [ClosedEmbedBuilder(sourceMessage, interaction.user)],
        });
        break;
      }
      case "reopen": {
        break;
      }
    }
  },
};
