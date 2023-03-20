const { StringSelectMenuInteraction, TextChannel } = require("discord.js");
const { ReopenModalBuilder } = require("../../builders/reopen.builder");
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
    const role = interaction.guild.roles.cache.get("1084850100322447521");
    if (!interaction.member.roles.cache.has(role.id))
      return await interaction.reply({
        content: `You are not a developer`,
        ephemeral: true,
      });

    const chosen = interaction.values[0];
    const /** @type TextChannel */ textChannel = channels.future(interaction);
    const sourceMessage = interaction.message;

    switch (chosen) {
      case "verified": {
        await interaction.update({
          content: "",
          embeds: [VerifiedEmbedBuilder(sourceMessage, interaction.user)],
          components: [],
        });

        await textChannel.send({
          embeds: [ClosedEmbedBuilder(sourceMessage, interaction.user)],
        });
        break;
      }
      case "reopen": {
        await interaction.showModal(ReopenModalBuilder());
        break;
      }
    }
  },
};
